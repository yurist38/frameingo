Meteor.publish('userData', function() {
    return Meteor.users.find({_id: this.userId});
});

Meteor.publish('userEvents', function() {
    return Events.find();
})
