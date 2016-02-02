ServiceConfiguration.configurations.remove({
    service: "instagram"
});
ServiceConfiguration.configurations.insert({
    service: "instagram",
    clientId: Meteor.settings.clientId,
    scope: "public_content",
    secret: Meteor.settings.secret
});
