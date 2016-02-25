Router.configure({
    layoutTemplate: 'mainLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    trackPageView: true,
    waitOn() {
        return Meteor.subscribe('userData');
    }
});

Router.onBeforeAction('loading');
