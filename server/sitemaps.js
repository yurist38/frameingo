sitemaps.add('/sitemap.xml', function() {
    return [
        {
            page: '/',
            lastmod: new Date(),
            xhtmlLinks: [
                {
                    rel: 'alternate',
                    hreflang: 'en',
                    href: '/'
                },
                {
                    rel: 'alternate',
                    hreflang: 'ru',
                    href: '/ru'
                }
            ]
        },
        {
            page: '/ru',
            lastmod: new Date(),
            xhtmlLinks: [
                {
                    rel: 'alternate',
                    hreflang: 'en',
                    href: '/'
                },
                {
                    rel: 'alternate',
                    hreflang: 'ru',
                    href: '/ru'
                }
            ]
        }
    ];
});
