// Reservations and products should propagate to the server-side and also update properly.
// Note: Since product.avaliable could mean stock or the difference between stock and reserved we will assume it is the stock.
//       Also, no other property will be used as the difference to avoid confusion. This will limit the behavior accordingly.

shoppingCartModule.factory('productsFactory', ['jsonProductFeedResultMockFactory', function (jsonProductFeedResultMockFactory) {
    var products = jsonProductFeedResultMockFactory.products;
    // This should be seen as all reservations received by the server.
    var reservations = [];

    var publicObj = {};

    publicObj.findProductByTitle = function (title) {
        var product = _.find(products, { 'title': title });

        if (!product) {
            throw "Product is undefined. Title: " + title + ".";
        }

        return _.clone(product, true);
    };

    publicObj.handleReservationByTitle = function (title, onReservationNotFoundFn, onReservationAvailableFn, onReservationUnavailableFn) {
        var reservation = _.find(reservations, { 'title': title });
        var product = publicObj.findProductByTitle(title);

        if (!reservation) {
            return onReservationNotFoundFn(reservation, product);
        }

        if (reservation.units < product.available) {
            return onReservationAvailableFn(reservation, product);
        }
        else {
            return onReservationUnavailableFn(reservation, product);
        }
    };

    publicObj.isAvailableByTitle = function (title) {


        return publicObj.handleReservationByTitle(title, function (reservation, product) {
            if (product.available <= 0) {
                return false;
            }

            return true;
        },
        function () {
            return true;
        },
        function () {
            return false;
        });
    };

    publicObj.reserveProductByTitle = function (title) {

        return publicObj.handleReservationByTitle(title, function (reservation, product) {
            reservations.push(_.assign(product, { units: 1 }));
            return true;
        },
        function (reservation, product) {
            reservation.units++;
            return true;
        },
        function () {
            return false;
        });
    };

    publicObj.clearReservations = function () {
        reservations = [];
    };

    publicObj.getProducts = function (titles) {
        if (!titles) {
            return _.clone(products);
        }
        else if (_.isString(titles)) {
            return _.clone(publicObj.findProductByTitle(titles), true);
        }
        else if (_.isArray(titles)) {
            return _.clone(_.filter(products, function (item) {
                return _.contains(titles, item['title']);
            }), true);
        }
    };

    // Try to sell more of the product with most in stock.
    publicObj.getFocusedProduct = function () {
        return _.clone(_.max(products, function (product) {
            return publicObj.handleReservationByTitle(product.title, function (reservation) {
                return product.available;
            },
            function (reservation) {
                return product.available - reservation.units;
            }, function (reservation) {
                return product.available - reservation.units;
            });
        }), true);
    };

    return publicObj;
}]);