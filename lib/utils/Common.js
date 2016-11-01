export default class Common {
    getActiveTag() {
        return this.isEvent() ? this.currentEvent().tag : Session.get('tag')
    }

    getActiveGrid() {
        return this.isEvent() ? this.currentEvent().grid : (Session.get('grid') || 'grid1');
    }

    setActiveGrid(gridName) {
        if (this.isEvent()) {
            Events.update({
                _id: this.currentEvent()._id
            }, {
                $set: {
                    grid: gridName
                }
            });
        } else {
            Session.set('grid', gridName);
            Session.set('picsNum', Grids.findOne({"name": gridName}).quantity);
        }
        this.getImages();
    }

    getActiveToken() {
        return Meteor.user() ? Meteor.user().services.instagram.accessToken :
            Meteor.settings.public.commonAccessToken;
    }

    getImages() {
        const url = Session.get('isPagination') ? Session.get('nextUrl') :
            'https://api.instagram.com/v1/tags/' + this.getActiveTag() + '/media/recent';
        const data = {
            access_token: this.getActiveToken(),
            count: Grids.findOne({'name': this.getActiveGrid()}).quantity
        };
        $.ajax({
            url,
            type: 'GET',
            dataType: 'jsonp',
            data,
            jsonpCallback: 'ip',
            success: response => {
                if (response.data && response.data.length) {
                    this.updateImagesCollection(response);
                    setTimeout(() => this.getItems(), 7000);
                } else if (response.data && Session.get('isPagination')){
                    Session.set('isPagination', false);
                    this.getItems();
                } else if (response.meta && response.meta.code === 400) {
                    sweetAlert('Sorry, service is temporary unavailable... We apologize for inconvenience...');
                } else {
                    sweetAlert(TAPi18n.__('global.images-not-found'));
                }
            },
            statusCode: {
                429() {
                    sweetAlert(TAPi18n.__('global.error-limit'));
                }
            }
        });
    }

    getItems() {
        const curRoute = Router.current().route.getName();

        if (curRoute !== 'search' && curRoute !== 'event') return false;
        this.getImages();
    }

    currentEvent() {
        return Events.findOne({
            'name': Router.current().params.name,
            'userId': Meteor.userId()
        });
    }

    isEvent() {
        return Router.current().route.getName() === 'event';
    }

    updateImagesCollection(response) {
        if (Session.get('currentCollectionId')) {
            EventData.remove({_id: Session.get('currentCollectionId')});
        }
        Session.set('currentCollectionId', EventData.insert(response.data));
        Session.set('nextUrl', response.pagination.next_url);
        if ($('.item0>a').attr('href') === response.data[0].link) Session.set('isPagination', true);
    }

    validateForm(id) {
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

    validateEventForm(id) {
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

    selectGrid() {
        const screenWidth = $(window).width();
        const screenHeight = $(window).height() - 40;

        if (screenWidth < 480) {
            Session.set('grid', 'grid1');
            return;
        }

        let rightGrid = 'grid2';
        if (screenWidth / screenHeight >= 2) {
            rightGrid = 'grid3';
        } else if (screenWidth / screenHeight >= 1.5) {
            rightGrid = 'grid1';
        }

        Session.set('grid', rightGrid);
    }
}
