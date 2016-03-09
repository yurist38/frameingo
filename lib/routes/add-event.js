Router.route('/events/add-event', {
    name: 'addevent',
    template: 'addevent',
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
