Router.plugin('seo', {
    defaults: {
        title: 'InstaPhobia - Live Instashow',
        description: 'Live Instagram Feed Slideshow for your event, party or just for fun!'
    }
});

iPhobia = {};

Template.mainLayout.created = () => {
    TAPi18n.setLanguage(I18NConf.getLanguage());
    jQuery.validator.addMethod('singleWord', function(value, element) {
        if (/^[A-Za-zА-ЯЁа-яё0-9]+$/.test(value)) {
            return true;
        } else {
            return false;
        }
    }, TAPi18n.__('add-event.error-not-valid'));
};

Template.mainLayout.rendered = function() {
    let styles = [
    'background:#98AFC7;color:#ffffff;font-weight:bold;',
    'background:#2B547E;color:#ffffff;font-weight:bold;',
    'background:#2B3856;color:#ffffff;font-weight:bold;'
    ];
    console.log ( '%c Welcome to %c Instaphobia\'s %c Underground!',
        styles[0], styles[1], styles[2]);
};

Template.errorLogin.events({
    'click #addEventLoginBtn': () => {
        Meteor.loginWithInstagram( () => {} );
    }
});

Template.registerHelper("items", function(){
    if (!Session.get('currentCollectionId')) return false;
    let resultObj = EventData.findOne({_id: Session.get('currentCollectionId')});
    let result = $.map(resultObj, (value, index) => {
        if (index !== '_id') return [value];
    });
    return result;
});

getImages = function(token, grid, tag) {
    $.ajax({
        url: 'https://api.instagram.com/v1/tags/' + tag + '/media/recent',
        type: 'GET',
        dataType: 'jsonp',
        data: {
            access_token: token,
            count: Grids.findOne({"name": grid}).quantity
        },
        cache: false,
        success(response) {
            if (Session.get('currentCollectionId')) EventData.remove({_id: Session.get('currentCollectionId')});
            Session.set('currentCollectionId', EventData.insert(response.data));
            setTimeout(getItems, 7000);
        },
        error(error) {
            console.log('Error is', error);
        }
    });
}

getItems = function() {
    let curRoute = Router.current().route.getName();
    if(curRoute !== 'search' && curRoute !== 'event') return false;
    let token = Meteor.user() ? Meteor.user().services.instagram.accessToken :
        Meteor.settings.public.commonAccessToken;
    let activeGrid = isEvent() ? currentEvent().grid : Session.get('grid') || 'grid1';
    let tag = isEvent() ? currentEvent().tag : Session.get('tag');
    getImages(token, activeGrid, tag);
}

currentEvent = function() {
    return Events.findOne({
        "name": Router.current().params.name,
        "userId": Meteor.userId()
    });
}

isEvent = function() {
    return Router.current().route.getName() === 'event';
}

validateForm = function(id) {
    return $('#' + id).validate({
        rules: {
            tagField: {
                required: true,
                singleWord: true
            }
        },
        messages: {
            tagField: TAPi18n.__('add-event.error-not-valid')
        }
    });
}

validateEventForm = function(id) {
    return $('#' + id).validate({
        rules: {
            eventName: {
                required: true,
                singleWord: true
            },
            eventTag: {
                required: true,
                singleWord: true
            }
        },
        messages: {
            eventName: TAPi18n.__('add-event.error-not-valid'),
            eventTag: TAPi18n.__('add-event.error-not-valid')
        }
    });
}
