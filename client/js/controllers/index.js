Template.index.rendered = function() {
    $('.content').css('height', ($(window).height() - $('nav').outerHeight()) + 'px' );
}

Template.mainLayout.helpers({
    currentUser: function() {
        return !!Meteor.userId() && !!Template.subscriptionsReady;
    }
})
