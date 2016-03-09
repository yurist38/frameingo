Router.configure({
    layoutTemplate: 'mainLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    trackPageView: true,
    waitOn() {
        return Meteor.subscribe('userData');
    },
    i18n: {
         compulsoryLangCode: false,
         langCodeForDefaultLanguage: false,
    }
});

Router.onBeforeAction('loading');

I18NConf.configure({
    defaultLanguage: 'en',
    languages: ['en', 'ru'],
    autoConfLanguage: true
});
