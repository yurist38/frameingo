Router.configure({
    layoutTemplate: 'mainLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn() {
        return Meteor.subscribe('userData');
    }
});

Router.onBeforeAction('loading');
