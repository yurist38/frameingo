Router.configure({
    layoutTemplate: 'mainLayout'
});

Router.route('/', function () {
    this.render('index');
});

Router.route('/events', function () {
    this.render('eventlist');
});

Router.route('/events/add-event', function () {
    this.render('addevent');
});
