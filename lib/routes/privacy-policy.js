Router.route('/privacy-policy', {
    name: 'privacy-policy',
    template: 'privacyPolicy',
    seo: {
        title() {
            return 'Privacy Policy [InstaPhobia]';
        },
        description() {
            return 'This privacy policy has been compiled to better serve those who are concerned with how their \'Personally identifiable information\' (PII) is being used online.';
        }
    }
});
