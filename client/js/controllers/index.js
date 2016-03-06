Template.mainLayout.created = () => {
    TAPi18n.setLanguage(I18NConf.getLanguage());
};

Template.index.events({
    'click .block1': () => {
        Router.go('addevent');
    }
});
