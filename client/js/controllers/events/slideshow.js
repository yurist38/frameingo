import getImages from '../../modules/get-items';

Template.slideshow.helpers({
    items() {
        if (!isHaveEventData() || !Session.get('currentCollectionId')) return false;
        let resultObj = EventData.findOne({_id: Session.get('currentCollectionId')});
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
    getItems();
}

function currentEvent() {
    return Events.findOne({
        "name": Router.current().params.name,
        "userId": Meteor.userId()
    });
}

function isHaveEventData() {
    return !!EventData.find({}, {sort: {Field: -1}, limit: 1}).fetch().length;
}

function getActiveGrid() {
    return currentEvent().grid;
}

function getItems() {
    if(Router.current().route.getName() !== 'event') return false;

    getImages(
        Meteor.user().services.instagram.accessToken,
        currentEvent().grid,
        currentEvent().tag
    );
}
