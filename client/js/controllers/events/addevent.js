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
            alert('Sorry! This name already exists in your events list...');
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
            alert('Error! Sorry, your event have not been added...');
        }
    },
    'input input': function(event) {
        $('#saveEventBtn').attr('disabled', !$(event.target).closest('form').valid());
    }
});

function isNameExists(name) {
    return Events.find({name}).count();
}

jQuery.validator.addMethod("singleWord", function(value, element) {
    if (/^[A-Za-z]+$/.test(value)) {
        return true;
    } else {
        return false;
    }
}, "Check value please, must be single word...");
