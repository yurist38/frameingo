import Common from '../../../lib/utils/Common';
import UserEvent from '../../../lib/utils/UserEvent';

const commonUtils = new Common();
const userEventUtils = new UserEvent();

Template.header.helpers({
    userName() {
        return Meteor.user().profile.name;
    },
    userPic() {
        return Meteor.user().services.instagram.profile_picture;
    },
    langs() {
        var langsArray = $.map(TAPi18n.getLanguages(), (value, index) => {
            return [index];
        });
        return langsArray;
    },
    isUserEventsExists() {
        return !!Meteor.user() && !!Events.find({"userId": Meteor.user()._id}).count();
    },
    formStatus() {
        return Session.get('tag') || commonUtils.isEvent() ? '' : 'hidden';
    },
    activeGrid() {
        return commonUtils.getActiveGrid();
    },
    grids() {
        return Grids.find().fetch();
    },
    isGridActive(gridName) {
        return gridName === commonUtils.getActiveGrid() ? 'active' : '';
    },
    activeTag() {
        return commonUtils.getActiveTag();
    },
    userEvents() {
        return Events.find().fetch();
    },
    isDisabled(eventName) {
        return (Router.current().route.getName() === 'event' &&
            eventName === Router.current().params.name) ? 'disabled' : '';
    },
    showAuthorStatus() {
        return Session.get('isShowAuthor') ? 'active' : '';
    },
    hiddenOnMain() {
        return Router.current().route.getName() === 'home' ? 'hidden' : '';
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
        var tag = $('#headerTagField').val();
        Session.set('tag', tag);
        Session.set('isPagination', false);
        if (Router.current().route.getName() === 'search') {
            document.title = `#${tag} [FrameInGo]`;
        }
        Router.go('search', {tag});
    },
    'input #headerTagField': () => {
        $('#headerBtnGo').prop('disabled', !$('#headerForm').valid());
    },
    'click .grid-li a': (e) => {
        commonUtils.setActiveGrid(e.currentTarget.id);
    },
    'click #isShowAuthor': () => {
        Session.set('isShowAuthor', !Session.get('isShowAuthor'));
    },
    'click .event-edit-btn': (e) => {
        e.preventDefault();
        e.stopPropagation();
        let name = $(e.currentTarget).closest('.li-event').find('.event-name').val();
        if (!$(e.currentTarget).hasClass('disabled')) {
            userEventUtils.editEvent($(e.currentTarget).closest('.li-event'));
        }
    },
    'click .event-remove-btn': (e) => {
        e.preventDefault();
        e.stopPropagation();
        let name = $(e.currentTarget).closest('.li-event').find('.event-name').val();
        if (!$(e.currentTarget).hasClass('disabled')) {
            userEventUtils.removeEvent($(e.currentTarget).data('eventid'));
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
            Session.set('isPagination', false);
        }
    },
    'submit .event-form': (e) => {
        e.preventDefault();
        userEventUtils.updateEvent($(e.currentTarget));
    },
    'click .new-event-btn': (e) => {
        e.stopPropagation();
        $(e.currentTarget).hide(100, function() {
            $('.new-event-form').removeClass('hidden');
            $(this).next('.new-event-form').find('.event-name').val('').focus();
            $(this).next('.new-event-form').find('.event-tag').val('');
            commonUtils.validateEventForm('newEventForm');
        });
    },
    'click .cancel-new-btn': (e) => {
        e.preventDefault();
        e.stopPropagation();
        $('.new-event-form').addClass('hidden');
        $('.new-event-btn').show();
    },
    'submit #newEventForm': (e) => {
        e.preventDefault();
        e.stopPropagation();
        userEventUtils.addEvent($(e.currentTarget));
        $('.new-event-form').addClass('hidden');
        $('.new-event-btn').show();
    }
});

function validateFormOrWait() {
    if ($('#headerFormLi').is(':visible')) {
        iPhobia.validatorHeaderForm = commonUtils.validateForm('headerForm');
    } else {
        setTimeout(validateFormOrWait, 1000);
    }
}
