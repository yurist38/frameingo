Template.slideshow.helpers({
    pics: getItems()
});

//Template.slideshow.rendered({

//});

function getItems() {
    //if(Meteor.user()) {
        let accessToken = Meteor.user().services.instagram.accessToken;
        return accessToken;
    //} else {
    //    return setTimeout(getItems(), 500);
    //}
}
