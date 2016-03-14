Router.plugin('seo', {
    defaults: {
        title: 'InstaPhobia - Live Instashow',
        description: 'Live Instagram Feed Slideshow for your event, party or just for fun!'
    }
});

jQuery.validator.addMethod("singleWord", function(value, element) {
    if (/^[A-Za-zА-ЯЁа-яё0-9]+$/.test(value)) {
        return true;
    } else {
        return false;
    }
}, TAPi18n.__('add-event.error-not-valid'));

Template.registerHelper("items", function(){
    if (!Session.get('currentCollectionId')) return false;
    let resultObj = EventData.findOne({_id: Session.get('currentCollectionId')});
    let result = $.map(resultObj, (value, index) => {
        if (index !== '_id') return [value];
    });
    return result;
});

getImages = function(token, grid, tag) {
    $.ajax({
        url: 'https://api.instagram.com/v1/tags/' + tag + '/media/recent',
        type: 'GET',
        dataType: 'jsonp',
        data: {
            access_token: token,
            count: Grids.findOne({"name": grid}).quantity
        },
        cache: false,
        success(response) {
            if (Session.get('currentCollectionId')) EventData.remove({_id: Session.get('currentCollectionId')});
            Session.set('currentCollectionId', EventData.insert(response.data));
            setTimeout(getItems, 7000);
        },
        error(error) {
            console.log('Error is', error);
        }
    });
}

getItems = function() {
    let curRoute = Router.current().route.getName();
    if(curRoute !== 'search' || curRoute !== 'event') return false;
    let token = Meteor.user() ? Meteor.user().services.instagram.accessToken :
        Meteor.settings.public.commonAccessToken;
    let activeGrid = isEvent() ? currentEvent().grid : Session.get('grid') || 'grid1';
    let tag = isEvent() ? currentEvent().tag : Session.get('tag');
    getImages(token, activeGrid, tag);
}

currentEvent = function() {
    return Events.findOne({
        "name": Router.current().params.name,
        "userId": Meteor.userId()
    });
}

isEvent = function() {
    return Router.current().route.getName() === 'event';
}
