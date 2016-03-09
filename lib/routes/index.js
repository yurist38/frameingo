Router.route('/', {
    name: 'home',
    template: 'index',
    seo: {
        title() {
            return TAPi18n.__('index.meta-title');
        },
        description() {
            return TAPi18n.__('index.meta-description');
        }
    }
});
