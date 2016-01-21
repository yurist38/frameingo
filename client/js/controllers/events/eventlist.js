Template.eventlist.helpers({
    isEventExists: function() {
        return Events.find().count();
    },
    userEvents: function() {
        return Events.find({
            "userId": Meteor.user()._id
        });
    }
});

Template.eventlist.events({
    'click #addEvent': gotoAddEvent,
    'click .delete-event-link': function () {
        Events.remove(this._id);
    }
});

function gotoAddEvent() {
    Router.go('/events/add-event');
}
