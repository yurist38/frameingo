Template.header.helpers({
    userName() {
        return Meteor.user().profile.name;
    },
    userPic() {
        return Meteor.user().services.instagram.profile_picture;
    },
    langs() {
        var langsArray = $.map(TAPi18n.getLanguages(), function(value, index) {
            return [index];
        });
        return langsArray;
    },
    isUserEventsExists() {
        return !!Meteor.user() && !!Events.find({"userId": Meteor.user()._id}).count();
    },
    formStatus() {
        return Session.get('tag') || isEvent() ? '' : 'hidden';
    },
    activeGrid() {
        return getActiveGrid();
    },
    grids() {
        return Grids.find().fetch();
    },
    isGridActive(gridName) {
        return gridName === getActiveGrid() ? 'active' : '';
    },
    activeTag() {
        return getActiveTag();
    },
    userEvents() {
        return Events.find().fetch();
    },
    isDisabled(eventName) {
        return (Router.current().route.getName() === 'event' &&
            eventName === Router.current().params.name) ? 'disabled' : '';
    }
});

Template.header.created = function() {
    this.subscribe('userData');
    this.subscribe('userEvents');
    this.subscribe('grids');
};

Template.header.rendered = () => {
    validateFormOrWait();
};

Template.header.events({
    'click #loginBtn': () => {
        Meteor.loginWithInstagram( () => {} );
    },
    'click #logoutBtn': () => {
        Meteor.logout( () => {} );
    },
    'click #langsMenu a': (e) => {
        e.preventDefault();
        let newLang = $(e.currentTarget).data('lang');
        TAPi18n.setLanguage(newLang);
        I18NConf.setLanguage(newLang);
        if (iPhobia.validatorHeaderForm)
            iPhobia.validatorHeaderForm.settings.messages.tagField = TAPi18n.__('add-event.error-not-valid');
        if (iPhobia.validatorIndexForm)
            iPhobia.validatorIndexForm.settings.messages.tagField = TAPi18n.__('add-event.error-not-valid');
    },
    'submit #headerForm': (e) => {
        e.preventDefault();
        let tag = $('#headerTagField').val();
        Router.go('search', {tag: tag});
    },
    'input #headerTagField': () => {
        $('#headerBtnGo').prop('disabled', !$('#headerForm').valid());
    },
    'click .grid-li a': (e) => {
        setActiveGrid(e.currentTarget.id);
    },
    'click .event-edit-btn': (e) => {
        e.preventDefault();
        e.stopPropagation();
        let name = $(e.currentTarget).closest('.li-event').find('.event-name').val();
        if (!$(e.currentTarget).hasClass('disabled')) {
            editEvent($(e.currentTarget).closest('.li-event'));
        }
    },
    'click .event-remove-btn': (e) => {
        e.preventDefault();
        e.stopPropagation();
        let name = $(e.currentTarget).closest('.li-event').find('.event-name').val();
        if (!$(e.currentTarget).hasClass('disabled')) {
            removeEvent($(e.currentTarget).data('eventid'));
        }
    },
    'click .cancel-edit-btn': (e) => {
        e.preventDefault();
        e.stopPropagation();
        let $currentLi = $(e.currentTarget).closest('.li-event'),
            $inputName = $currentLi.find('.event-name'),
            $inputTag = $currentLi.find('.event-tag');
        $inputName.val($inputName.data('current-value')).attr('readonly', true);
        $inputTag.val($inputTag.data('current-value')).attr('readonly', true);
        $currentLi.removeClass('editing');
    },
    'click .event-link': (e) => {
        if ($(e.currentTarget).closest('.li-event').hasClass('editing')) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            $('.showing-link').dropdown('toggle');
        }
    },
    'submit .event-form': (e) => {
        e.preventDefault();
        updateEvent($(e.currentTarget));
    },
    'click .new-event-btn': (e) => {
        e.stopPropagation();
        $(e.currentTarget).hide(100, function() {
            $('.new-event-form').removeClass('hidden');
            $(this).next('.new-event-form').find('.event-name').val('').focus();
            $(this).next('.new-event-form').find('.event-tag').val('');
            validateEventForm('newEventForm');
        });
    },
    'click .cancel-new-btn': (e) => {
        e.stopPropagation();
        $('.new-event-form').addClass('hidden');
        $('.new-event-btn').show();
    },
    'submit #newEventForm': (e) => {
        e.preventDefault();
        e.stopPropagation();
        addEvent($(e.currentTarget));
        $('.new-event-form').addClass('hidden');
        $('.new-event-btn').show();
    }
});

function getActiveTag() {
    return isEvent() ? currentEvent().tag : Session.get('tag');
}

function getActiveGrid() {
    if (isEvent()) {
        return currentEvent().grid;
    }
    return Session.get('grid') || 'grid1';
}

function setActiveGrid(gridName) {
    if (isEvent()) {
        Events.update({
            _id: currentEvent()._id
        }, {
            $set: {
                grid: gridName
            }
        });
        getImages(
            Meteor.user().services.instagram.accessToken,
            currentEvent().grid,
            currentEvent().tag
        );
    } else {
        Session.set('grid', gridName);
        Session.set('picsNum', Grids.findOne({"name": gridName}).quantity);
        let token = Meteor.user() ? Meteor.user().services.instagram.accessToken :
            Meteor.settings.public.commonAccessToken;
        getImages(token, getActiveGrid(), getActiveTag());
    }
}

function editEvent($el) {
    $el.addClass('editing');
    let $inputName = $el.find('.event-name'),
        $inputTag = $el.find('.event-tag');
    $inputName.attr('data-current-value', $inputName.val()).attr('readonly', false).focus();
    $inputTag.attr('data-current-value', $inputTag.val()).attr('readonly', false);
    validateEventForm($el.find('form').attr('id'));
}

function updateEvent($form) {
    let $newNameInput = $form.find('.event-name'),
        $newTagInput = $form.find('.event-tag'),
        eventId = $form.attr('id').substring(5);
    Events.update({
        _id: eventId
    }, {
        $set: {
            name: $newNameInput.val(),
            tag: $newTagInput.val()
        }
    });
    $newNameInput.attr('readonly', true);
    $newTagInput.attr('readonly', true);
    $form.closest('.li-event').removeClass('editing');
}

function removeEvent(id) {
    Events.remove({'_id': id});
}

function addEvent($form) {
    let $newNameInput = $form.find('.event-name'),
        $newTagInput = $form.find('.event-tag');
    Events.insert({
        "userId": Meteor.user()._id,
        "name": $newNameInput.val(),
        "tag": $newTagInput.val(),
        "grid": 'grid1'
    });
}

function validateFormOrWait() {
    if ($('#headerFormLi').is(':visible')) {
        iPhobia.validatorHeaderForm = validateForm('headerForm');
    } else {
        setTimeout(validateFormOrWait, 1000);
    }
}
