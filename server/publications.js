Meteor.publish('userData', function() {
    return Meteor.users.find({_id: this.userId});
});

Meteor.publish('userEvents', function() {
    return Events.find({"userId": this.userId});
});

Meteor.publish('eventData', function() {
    return EventData.find();
});

Meteor.publish('grids', function() {
    return Grids.find();
});
