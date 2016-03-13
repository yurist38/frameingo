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
    }
});

Template.header.created = function() {
    this.subscribe('userData');
    this.subscribe('userEvents');
    this.subscribe('grids');
};

Template.header.rendered = () => {
    $('#headerForm').validate({
        rules: {
            headerTagField: {
                required: true,
                singleWord: true
            }
        },
        errorPlacement: function(error, element) {}
    });
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
    }
});

function isEvent() {
    return Router.current().route.getName() === 'event';
}

function currentEvent() {
    return Events.findOne({
        "name": Router.current().params.name,
        "userId": Meteor.userId()
    });
}

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
    } else {
        Session.set('grid', gridName);
        Session.set('picsNum', Grids.findOne({"name": gridName}).quantity);
    }
}
