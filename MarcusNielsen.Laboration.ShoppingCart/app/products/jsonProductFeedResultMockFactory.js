shoppingCartModule.factory('jsonProductFeedResultMockFactory', [function () {
    var jsonProductFeedResult = {
        success: true,
        products: [
            {
                title: 'Kid Icarus',
                price: 100,
                currency: 'SEK',
                image: 'http://cdn.medialib.officialnintendomagazine.co.uk/screens/screenshot_58526_thumb_wide610.jpg',
                available: 1
            },
            {
                title: 'Duck Tales',
                price: 150,
                currency: 'SEK',
                image: 'http://cdn.medialib.officialnintendomagazine.co.uk/screens/screenshot_58530_thumb_wide610.jpg',
                available: 2
            },
            {
                title: 'Mega Man',
                price: 450,
                currency: 'SEK',
                image: 'http://cdn.medialib.officialnintendomagazine.co.uk/screens/screenshot_58525_thumb_wide610.jpg',
                available: 4
            }
        ]
    };

    return jsonProductFeedResult;
}]);