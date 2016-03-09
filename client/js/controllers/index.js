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

Template.index.events({
    'click .block1': () => {
        Router.go('addevent');
    }
});
