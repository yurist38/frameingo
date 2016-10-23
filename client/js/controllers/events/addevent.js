import Common from '../../../../lib/utils/Common';
import UserEvent from '../../../../lib/utils/UserEvent';

const commonUtils = new Common();
const userEventUtils = new UserEvent();

Template.addevent.rendered = () => {
    commonUtils.validateEventForm('addEventForm');
    $('input.radioImageSelect').radioImageSelect();
};

Template.addevent.events({
    'click #addEventLoginBtn': Meteor.loginWithInstagram,
    'submit #addEventForm': function(event) {
        event.preventDefault();
        var eName = $('#eventName').val().replace(/<(?:.|\n)*?>|\s/gm, '');
        var eTag = $('#eventTag').val().replace(/<(?:.|\n)*?>|\s/gm, '');
        if (userEventUtils.isNameExists(eName)) {
            sweetAlert(TAPi18n.__('add-event.error-name-exists'));
        } else if ($('#addEventForm').valid()) {
            Events.insert({
                'userId': Meteor.user()._id,
                'name': eName,
                'tag': eTag,
                'grid': $('input[name="gridName"]:checked').val()
            }, () => {
                Router.go('eventlist');
            });
        } else {
            sweetAlert(TAPi18n.__('add-event.error-not-added'));
        }
    },
    'input input': () => {
        $('#saveEventBtn').prop('disabled', !$('#addEventForm').valid());
    }
});
