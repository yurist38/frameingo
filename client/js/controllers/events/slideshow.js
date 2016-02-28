let currentCollectionId, params, event, hashtag, request_url;

Template.slideshow.helpers({
    items() {
        if (!isHaveEventData() || !currentCollectionId) return false;
        let resultObj = EventData.findOne({_id: currentCollectionId});
        let result = $.map(resultObj, (value, index) => {
            if (index !== '_id') return [value];
        });
        return result;
    },
    activeGrid() {
        return getActiveGrid();
    },
    grids() {
        return Grids.find().fetch();
    },
    isGridActive(gridName) {
        return gridName === getActiveGrid() ? 'active' : '';
    }
});

Template.slideshow.created = () => {
    currentCollectionId = isHaveEventData() ?
        EventData.find({}, {sort: {Field: -1}, limit: 1}).fetch()[0]._id : '';
    event = Events.findOne({"name": Router.current().params.name});
    hashtag = event.tag;
    request_url = 'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent';
    params = {
        access_token: Meteor.user().services.instagram.accessToken,
        count: Grids.findOne({"name": getActiveGrid()}).quantity
    };
    getItems();
}

Template.slideshow.events({
    'click .grid-li>a': (event) => {
        setActiveGrid(event.currentTarget.id);
    }
});

function isHaveEventData() {
    return !!EventData.find({}, {sort: {Field: -1}, limit: 1}).fetch().length;
}

function getActiveGrid() {
    if (!isHaveEventData()) return false;
    return event.grid || 'grid1';
}

function setActiveGrid(gridName) {
    event.grid = gridName;
    params.count = Grids.findOne({"name": gridName}).quantity;
    getItems();
}

function getItems() {
    if(Router.current().route.getName() !== 'event') return false;

    $.ajax({
        url: request_url,
        type: 'GET',
        dataType: 'jsonp',
        data: params,
        cache: false,
        success(response) {
            if (currentCollectionId) EventData.remove({_id: currentCollectionId});
            currentCollectionId = EventData.insert(response.data);
            setTimeout(getItems, 10000);
        },
        error(error) {
            console.log('Error is', error);
        }
    });
}
