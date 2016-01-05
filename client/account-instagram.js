Meteor.loginWithInstagram(function (err, res) {
    if (err !== undefined)
        console.log('sucess ' + res)
    else
        console.log('login failed ' + err)
});
