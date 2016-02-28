Template.profile.helpers({
    avatar() {
        return userInsta() ? userInsta().profile_picture : '';
    },
    username() {
        return userInsta() ? userInsta().username : '';
    },
    instaId() {
        return userInsta() ? userInsta().id : '';
    },
    fullname() {
        return userInsta() ? userInsta().full_name : '';
    },
    bio() {
        return userInsta() ? userInsta().bio : '';
    },
    website() {
        return userInsta() ? userInsta().website : '';
    }
});

function userInsta() {
    return !!Meteor.user() ? Meteor.user().services.instagram : false;
}
