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
    }
});

Template.header.created = function() {
    this.subscribe('userData');
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
