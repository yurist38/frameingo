Template.header.helpers({
    userName: function() {
        return Meteor.user().profile.name
    },
    userPic: function() {
        return Meteor.user().services.instagram.profile_picture;
    },
});

Template.header.events({
    'click #loginBtn' : loginFn,
    'click #logoutBtn' : logoutFn
});

function loginFn() {
    Meteor.loginWithInstagram();
}

function logoutFn() {
    Meteor.logout();
}
