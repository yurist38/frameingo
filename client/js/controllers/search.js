import getImages from '../modules/get-items';

Template.search.helpers({
    items() {
        if (!Session.get('currentCollectionId')) return false;
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

Template.search.created = () => {
    Session.set('tag', Router.current().params.tag);
    getItems();
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