let currentCollectionId, params, event, hashtag, request_url;

Template.slideshow.helpers({
    items() {
        let resultObj = EventData.findOne({_id: currentCollectionId});
        let result = $.map(resultObj, (value, index) => {
            if (index !== '_id') return [value];
        });
        return result;
    }
});

Template.slideshow.created = function(){
    currentCollectionId = EventData.find({}, {sort: {Field: -1}, limit: 1}).fetch()[0]._id;
    event = Events.findOne({"name": Router.current().params.name});
    hashtag = event.tag;
    request_url = 'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent';
    params = {
        access_token: Meteor.user().services.instagram.accessToken,
        count: 5
    };
    getItems();
}

function getItems() {
    if(Router.current().route.getName() !== 'event') return false;

    $.ajax({
        url: request_url,
        type: 'GET',
        dataType: 'jsonp',
        data: params,
        jsonp: 'callback',
        jsonpCallback: 'jsonpcallback',
        cache: false,
        success(response) {
            EventData.remove({_id: currentCollectionId});
            currentCollectionId = EventData.insert(response.data);
            setTimeout(getItems, 10000);
        },
        error(error) {
            console.log('Error is', error);
        }
    });
}
