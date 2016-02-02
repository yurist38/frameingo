Template.header.helpers({
    userName: function() {
        return Meteor.user().profile.name;
    },
    userPic: function() {
        return Meteor.user().services.instagram.profile_picture;
    }
});

Template.header.created = function() {
    this.subscriptions = Meteor.subscribe('userData');
};

Template.header.events({
    'click #loginBtn': function() {
        Meteor.loginWithInstagram( function() {} );
    },
    'click #logoutBtn': function() {
        Meteor.logout( function() {} );
    }
});
