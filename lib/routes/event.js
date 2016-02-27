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
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next();
        } else {
            this.render('loading');
        }
    },
});
