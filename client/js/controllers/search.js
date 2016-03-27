Template.search.helpers({
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

Template.search.created = () => {
    Session.set('tag', Router.current().params.tag);
    getItems();
    selectGrid();
}

function getActiveGrid() {
    return Session.get('grid') || 'grid1';
}

function getHashtag() {
    return Session.get('tag');
}

function getItems() {
    if(Router.current().route.getName() !== 'search') return false;

    let token = Meteor.user() ? Meteor.user().services.instagram.accessToken :
        Meteor.settings.public.commonAccessToken;

    getImages(token, getActiveGrid(), getHashtag());
}
