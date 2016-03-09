Template.addevent.onRendered(function() {
    $('#addEventForm').validate({
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
        errorPlacement: function(error, element) {}
    });
    $('input.radioImageSelect').radioImageSelect();
});

Template.addevent.events({
    'click #addEventLoginBtn': Meteor.loginWithInstagram,
    'submit #addEventForm': function(event) {
        event.preventDefault();
        var eName = $('#eventName').val().replace(/<(?:.|\n)*?>|\s/gm, '');
        var eTag = $('#eventTag').val().replace(/<(?:.|\n)*?>|\s/gm, '');
        if (isNameExists(eName)) {
            alert(TAPi18n.__('add-event.error-name-exists'));
        } else if ($('#addEventForm').valid()) {
            Events.insert({
                "userId": Meteor.user()._id,
                "name": eName,
                "tag": eTag,
                "grid": $('input[name="gridName"]:checked').val()
            }, function() {
                Router.go('eventlist');
            });
        } else {
            alert(TAPi18n.__('add-event.error-not-added'));
        }
    },
    'input input': function(event) {
        $('#saveEventBtn').attr('disabled', !$(event.target).closest('form').valid());
    }
});

function isNameExists(name) {
    return !!Events.findOne({
        "name":name,
        "userId": Meteor.userId()
    });
}

jQuery.validator.addMethod("singleWord", function(value, element) {
    if (/^[A-Za-zА-ЯЁа-яё0-9]+$/.test(value)) {
        return true;
    } else {
        return false;
    }
}, TAPi18n.__('add-event.error-not-valid'));
