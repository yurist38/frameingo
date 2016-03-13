Router.plugin('seo', {
    defaults: {
        title: 'InstaPhobia - Live Instashow',
        description: 'Live Instagram Feed Slideshow for your event, party or just for fun!'
    }
});

jQuery.validator.addMethod("singleWord", function(value, element) {
    if (/^[A-Za-zА-ЯЁа-яё0-9]+$/.test(value)) {
        return true;
    } else {
        return false;
    }
}, TAPi18n.__('add-event.error-not-valid'));
