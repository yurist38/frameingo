Template.slideshow.helpers({
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
    Session.set('currentCollectionId', isHaveEventData() ?
        EventData.find({}, {sort: {Field: -1}, limit: 1}).fetch()[0]._id : '');
    getItems();
}

function isHaveEventData() {
    return !!EventData.find({}, {sort: {Field: -1}, limit: 1}).fetch().length;
}

function getActiveGrid() {
    return currentEvent().grid;
}
