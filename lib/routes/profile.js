Router.route('/profile', function() {
    if(Meteor.userId()) {
        this.render('profile');
    } else {
        this.render('notFound');
    }
});
