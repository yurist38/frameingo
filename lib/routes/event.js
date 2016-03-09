Router.route('/event/:name', {
    name: 'event',
    template: 'slideshow',
    waitOn() {
        return [
            Meteor.subscribe('userEvents'),
            Meteor.subscribe('eventData'),
            Meteor.subscribe('grids')
        ];
    },
    onBeforeAction() {
        let currentUser = Meteor.userId();
        if (currentUser && isEventExists()){
            this.next();
        } else if (currentUser && !isEventExists()) {
            this.render('notFound');
        } else {
            this.render('loading');
        }
    },
});

function isEventExists() {
    return !!Events.findOne({
        "name": Router.current().params.name,
        "userId": Meteor.userId()
    });
}
