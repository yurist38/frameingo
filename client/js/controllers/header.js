Template.header.helpers({
    userName() {
        return Meteor.user().profile.name;
    },
    userPic() {
        return Meteor.user().services.instagram.profile_picture;
    }
});

Template.header.created = function() {
    this.subscribe('userData');
};

Template.header.events({
    'click #loginBtn': function() {
        Meteor.loginWithInstagram( () => {} );
    },
    'click #logoutBtn': function() {
        Meteor.logout( () => {} );
    }
});
