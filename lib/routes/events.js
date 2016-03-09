Router.route('/events', {
    name: 'eventlist',
    template: 'eventlist',
    waitOn() {
        return Meteor.subscribe('userEvents');
    },
    onBeforeAction() {
        let currentUser = Meteor.userId();
        if (currentUser) {
            this.next();
        } else {
            this.render('errorLogin');
        }
    }
});
