Template.slideshow.helpers({
    items: function(eventName) {
        let curUser = Meteor.user();
        let curEvent = Events.findOne({
            "name": eventName,
            "userId": Meteor.userId()
        });
        return getItems(curUser, curEvent);
    }
});

function getItems(curUser, event) {
    let params = {
        access_token: curUser.services.instagram.accessToken,
        count: 5
    }
    let hashtag = event.tag;
    let request_url = 'https://api.instagram.com/v1/tags/' + hashtag +
        '/media/recent';
    let result;
    $.ajax({
        url: request_url,
        type: 'GET',
        dataType: 'jsonp',
        data: params,
        jsonp: 'callback',
        jsonpCallback: 'jsonpcallback',
        cache: false,
        success: function(response) {
            result = response.data;
        },
        error: function(error) {
            console.log(error);
        }
    });
    console.log(result);
    return result;
}
