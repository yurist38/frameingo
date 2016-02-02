Router.configure({
    layoutTemplate: 'mainLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return Meteor.subscribe('userData');
    }
});

Router.onBeforeAction('loading');

Router.route('/', {
    name: 'home',
    template: 'index'
});

Router.route('/events', {
    name: 'eventlist',
    template: 'eventlist',
    waitOn: function() {
        return Meteor.subscribe('userEvents');
    }
});

Router.route('/events/add-event', {
    name: 'addevent',
    template: 'addevent'
});

Router.route('/event/:name', {
    name: 'event',
    template: 'slideshow',
    waitOn: function() {
        return Meteor.subscribe('userEvents');
    },
    onBeforeAction: function() {
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next();
        } else {
            this.render('loading');
        }
    },
    data: function() {
        let self = this;
        return {
            eventName: function() {
                return self.params.name;
            }
        }
    }
});

Router.route('/profile', function() {
    if(Meteor.userId()) {
        this.render('profile');
    } else {
        this.render('notFound');
    }
});
