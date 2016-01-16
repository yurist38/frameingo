Router.configure({
    layoutTemplate: 'mainLayout'
});

Router.route('/', function () {
    this.render('index');
});

Router.route('/events', function () {
    this.render('events');
});
