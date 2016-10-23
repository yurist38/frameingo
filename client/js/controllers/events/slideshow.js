import Common from '../../../../lib/utils/Common';
import UserEvent from '../../../../lib/utils/UserEvent';

const commonUtils = new Common();
const userEventUtils = new UserEvent();

Template.slideshow.helpers({
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

Template.slideshow.created = () => {
    Session.set('currentCollectionId', userEventUtils.isThereEventData() ?
        EventData.find({}, {sort: {Field: -1}, limit: 1}).fetch()[0]._id : '');
    commonUtils.getItems();
}
