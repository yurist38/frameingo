Router.plugin('seo', {
    defaults: {
        title: 'InstaPhobia - Live Instashow',
        description: 'Live Instagram Feed Slideshow for your event, party or just for fun!',
        image: 'https://instaphobia.com/images/instaphobia-preview.jpg',
        meta: {
            keywords: ['instagram', 'slideshow', 'party', 'wedding', 'event', 'promotion', 'free', 'instaphobia']
        },
        og: {
            type: 'website',
            title: 'InstaPhobia - Live Instashow',
            site_name: 'InstaPhobia - Live Instashow',
            image: 'https://instaphobia.com/images/instaphobia-preview.jpg'
        }
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

Template.registerHelper("isShowAuthor", function(){
    return Session.get('isShowAuthor') === true;
});

getImages = function() {
    let url = Session.get('isPagination') ? Session.get('nextUrl') :
        'https://api.instagram.com/v1/tags/' + getActiveTag() + '/media/recent';
    var data = {
        access_token: getActiveToken(),
        count: Grids.findOne({"name": getActiveGrid()}).quantity
    };
    $.ajax({
        url,
        type: 'GET',
        dataType: 'jsonp',
        data,
        jsonpCallback: 'ip',
        success(response) {
            if (response.data.length) {
                updateImagesCollection(response);
                setTimeout(getItems, 7000);
            } else if (Session.get('isPagination')){
                Session.set('isPagination', false);
                getItems();
            } else {
                alert(TAPi18n.__('global.images-not-found'));
            }
        },
        statusCode: {
            429() {
                alert(TAPi18n.__('global.error-limit'));
            }
        }
    });
}

function getActiveTag() {
    return isEvent() ? currentEvent().tag : Session.get('tag')
}

function getActiveGrid() {
    return isEvent() ? currentEvent().grid : Session.get('grid') || 'grid1';
}

function getActiveToken() {
    return Meteor.user() ? Meteor.user().services.instagram.accessToken :
        Meteor.settings.public.commonAccessToken;
}

getItems = function() {
    var curRoute = Router.current().route.getName();

    if (curRoute !== 'search' && curRoute !== 'event') return false;
    getImages();
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

function updateImagesCollection(response) {
    if (Session.get('currentCollectionId')) {
        EventData.remove({_id: Session.get('currentCollectionId')});
    }
    Session.set('currentCollectionId', EventData.insert(response.data));
    Session.set('nextUrl', response.pagination.next_url);
    if ($('.item0>a').attr('href') === response.data[0].link) Session.set('isPagination', true);
}

selectGrid = function() {
    var screenWidth = $(window).width();
    var screenHeight = $(window).height() - 40;

    if (screenWidth < 480) {
        Session.set('grid', 'grid1');
        return;
    }

    var rightGrid = 'grid2';
    if (screenWidth / screenHeight >= 2) {
        rightGrid = 'grid3';
    } else if (screenWidth / screenHeight >= 1.5) {
        rightGrid = 'grid1';
    }

    Session.set('grid', rightGrid);
}
