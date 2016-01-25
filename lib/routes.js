Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound'
});

Router.route('/', {
    name: 'home',
    template: 'index'
});

Router.route('/events', {
    name: 'eventlist',
    template: 'eventlist'
});

Router.route('/events/add-event', {
    name: 'addevent',
    template: 'addevent'
});

Router.route('/event/:name', {
    waitOn: function() {
        return Meteor.user();
    },
    action: function() {
        let isEventExists = !!Events.find({'name': this.params.name}).count();
        if(this.ready() && isEventExists) {
            this.render('slideshow');
        } else {
            this.render('notFound');
        }
    }
});

Router.route('/profile', function(){
    if(Meteor.userId()) {
        this.render('profile');
    } else {
        this.render('notFound');
    }
});
