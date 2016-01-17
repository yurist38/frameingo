Router.configure({
    layoutTemplate: 'mainLayout'
});

Router.route('/', function () {
    this.render('index');
});

Router.route('/events', function () {
    if (Meteor.user()) {
        this.render('eventlist');
    } else {
        Router.go('/');
    }
});

Router.route('/events/add-event', function () {
    if (Meteor.user()) {
        this.render('addevent');
    } else {
        Meteor.loginWithInstagram(function(){
            if (Meteor.user()) {
                this.render('addevent');
            } else {
                Router.go('/');
            }
        });
    }
});
