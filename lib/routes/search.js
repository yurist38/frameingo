Router.route('/search/:tag', {
    name: 'search',
    template: 'search',
    waitOn() {
        return [
            Meteor.subscribe('grids'),
            Meteor.subscribe('eventData'),
        ];
    },
    seo: {
        title() {
            return TAPi18n.__('slideshow.meta-title', this.params.tag);
        },
        description() {
            return TAPi18n.__('slideshow.meta-description');
        }
    }
});
