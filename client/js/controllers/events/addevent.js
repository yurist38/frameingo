Template.addevent.events({
    'click #addEventLoginBtn': Meteor.loginWithInstagram,
    'submit #addEventForm': function(event) {
        event.preventDefault();
        var eName = $('#eventName').val();
        var eTag = $('#eventTag').val();
        if (eName && eTag) {
            Events.insert({
                "userId": Meteor.user()._id,
                "name": eName,
                "tag": eTag
            }, function(){
                Match.setTimeout(function(){
                     Router.go('/events');
                }, 3000);
            });
        } else {
            console.log('Error! Some fields are still emtpy...')
        }
    }
});
