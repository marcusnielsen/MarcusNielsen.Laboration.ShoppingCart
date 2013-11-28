// Reservations and products should propagate to the server-side and also update properly.
// Note: Since product.avaliable could mean stock or the difference between stock and reserved we will assume it is the stock.
//       Also, no other property will be used as the difference to avoid confusion. This will limit the behavior accordingly.

shoppingCartModule.factory('productsFactory', ['jsonProductFeedResultMockFactory', function (jsonProductFeedResultMockFactory) {
    var products = jsonProductFeedResultMockFactory.products;
    // This should be seen as all reservations received by the server.
    var reservations = [];

    var publicObj = {};

    publicObj.reserveProductByTitle = function (title) {
        var product = _.find(products, { 'title': title });

        if (!product) {
            throw "Product is undefined. Title: " + title + ".";
        }

        if (product.available <= 0) {
            return;
        }

        var reservation = _.find(reservations, { 'title': title });

        if (!reservation) {
            reservations.push(_.assign(_.pick(product, ['title']), { units: 1 }));
        }
        else if (reservation.units < product.available) {
            reservation.units++;
        }
        // No product available. reservation is defined and units >= available.
        else {
            return;
        }

        return _.pick(product, ['title', 'price', 'currency']);
    };

    publicObj.getProducts = function () {
        return products;
    };

    // Try to sell more of the product with most in stock.
    publicObj.getFocusedProduct = function () {
        return _.max(products, 'available');
    };

    return publicObj;
}]);