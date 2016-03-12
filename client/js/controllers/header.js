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
    }
});

Template.header.created = function() {
    this.subscribe('userData');
    this.subscribe('userEvents');
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
    }
});
