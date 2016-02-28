Router.route('/profile', {
    name: 'profile',
    onBeforeAction() {
        if(Meteor.userId()) {
            this.render('profile');
        } else {
            this.render('notFound');
        }
    }
});
