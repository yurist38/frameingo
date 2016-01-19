Router.configure({
    layoutTemplate: 'mainLayout'
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
