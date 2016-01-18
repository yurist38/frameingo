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
    'click #addEvent': addEvent
});

function addEvent() {
    Router.go('/events/add-event');
}
