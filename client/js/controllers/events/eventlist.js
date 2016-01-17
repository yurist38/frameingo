Template.eventlist.helpers({
    userEvents: function() {
        return false;
    }
});

Template.eventlist.events({
    'click #addEvent': addEvent
});

function addEvent() {
    Router.go('/events/add-event');
}
