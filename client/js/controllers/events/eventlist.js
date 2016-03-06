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
    'click #addEvent': () => {
        Router.go('addevent');
    },
    'click .delete-event-link': function () {
        Events.remove(this._id);
    }
});
