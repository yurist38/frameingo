Router.route('/event/:name', {
    name: 'event',
    template: 'slideshow',
    waitOn() {
        return [
            Meteor.subscribe('userEvents'),
            Meteor.subscribe('eventData'),
            Meteor.subscribe('grids')
        ];
    },
    onBeforeAction() {
        let currentUser = Meteor.userId();
        if (currentUser && !!getEventTag()){
            this.next();
        } else if (currentUser && !!getEventTag()) {
            this.render('notFound');
        } else {
            this.render('loading');
        }
    },
    seo: {
        title() {
            return TAPi18n.__('slideshow.meta-title', getEventTag());
        },
        description() {
            return TAPi18n.__('slideshow.meta-description');
        }
    }
});

function getEventTag() {
    return Events.findOne({
        "name": Router.current().params.name,
        "userId": Meteor.userId()
    }).tag;
}
