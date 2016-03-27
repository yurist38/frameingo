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
    },
    seo: {
        title() {
            return TAPi18n.__('event-list.meta-title');
        },
        description() {
            return TAPi18n.__('event-list.meta-description');
        }
    }
});
