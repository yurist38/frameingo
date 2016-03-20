Template.index.rendered = () => {
    iPhobia = iPhobia || {};
    iPhobia.validatorIndexForm = validateForm('indexForm');
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
        iPhobia.validatorHeaderForm = validateForm('headerForm');
        Router.go('search', {tag: tag});
    },
    'input #indexTagField': () => {
        $('#indexBtnGo').prop('disabled', !$('#indexForm').valid());
    }
});
