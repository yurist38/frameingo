Template.mainLayout.created = () => {
    TAPi18n.setLanguage(I18NConf.getLanguage());
};

Template.mainLayout.rendered = function() {
    let styles = [
    'background:#98AFC7;color:#ffffff;font-weight:bold;',
    'background:#2B547E;color:#ffffff;font-weight:bold',
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

Template.index.rendered = () => {
    $('#indexForm').validate({
        rules: {
            indexTagField: {
                required: true,
                singleWord: true
            }
        },
        errorPlacement: function(error, element) {}
    });
};

Template.index.helpers({
    formStatus() {
        return Session.get('tag') ? 'hidden' : '';
    }
});

Template.index.events({
    'submit #indexForm': (e) => {
        e.preventDefault();
        let tag = $('#indexTagField').val();
        $('#headerFormLi').removeClass('hidden');
        $('#indexForm').addClass('hidden');
        Router.go('search', {tag: tag});
    },
    'input #indexTagField': () => {
        $('#indexBtnGo').prop('disabled', !$('#indexForm').valid());
    }
});
