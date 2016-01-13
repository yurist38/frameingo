ServiceConfiguration.configurations.remove({
    service: "instagram"
});
ServiceConfiguration.configurations.insert({
    service: "instagram",
    clientId: Meteor.settings.clientId,
    scope: "basic",
    secret: Meteor.settings.secret
});
