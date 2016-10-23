import Common from '../../../lib/utils/Common';

const commonUtils = new Common();

Template.search.helpers({
    activeGrid() {
        return commonUtils.getActiveGrid();
    },
    grids() {
        return Grids.find().fetch();
    },
    isGridActive(gridName) {
        return gridName === commonUtils.getActiveGrid() ? 'active' : '';
    }
});

Template.search.created = () => {
    Session.set('tag', Router.current().params.tag);
    commonUtils.getItems();
    commonUtils.selectGrid();
}
