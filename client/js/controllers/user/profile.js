Template.profile.helpers({
    avatar: function() {
        return userInsta().profile_picture;
    },
    username: function() {
        return userInsta().username;
    },
    instaId: function() {
        return userInsta().id;
    },
    fullname: function() {
        return userInsta().full_name;
    },
    bio: function() {
        return userInsta().bio;
    },
    website: function() {
        return userInsta().website;
    }
});

function userInsta() {
    return Meteor.user().services.instagram;
}
