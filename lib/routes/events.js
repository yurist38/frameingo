Router.route('/events', {
    name: 'eventlist',
    template: 'eventlist',
    waitOn() {
        return Meteor.subscribe('userEvents');
    }
});
