shoppingCartModule.factory('shoppingCartFactory', ['$log', 'productsFactory', function ($log, productsFactory) {
    // This should be seen as the per-user reservations.
    var cartItems = [];
    var publicObj = {};

    publicObj.addToCart = function (title) {
        var isReserved;

        try {
            isReserved = productsFactory.reserveProductByTitle(title);
        } catch (e) {
            $log.warn(e);
        }

        if (isReserved) {
            var existingCartItem = _.find(cartItems, {'title': title});

            if (existingCartItem) {
                existingCartItem.units++;
            }
            else {
                cartItems.push(_.assign(productsFactory.getProducts(title), { units: 1 }));
            }
        }
    };

    publicObj.getCartItems = function () {
        return cartItems;
    };

    publicObj.hasCartItemByTitle = function (title) {
        return _.some(cartItems, {'title': title});
    };

    publicObj.getCartItemByTitle = function (title) {
        var cartItem = _.find(cartItems, { 'title': title });

        return cartItem;
    };

    publicObj.getUnitsSum = function () {
        return _.reduce(cartItems, function (accumulator, value, key, collection) {
            accumulator += value.units;
            return accumulator;
        }, 0);
    };

    publicObj.getPricesSum = function () {
        if (cartItems.length === 0) {
            return 0;
        }

        return _.reduce(cartItems, function (accumulator, value, key, collection) {
            accumulator += value.price * value.units;
            return accumulator;
        }, 0);
    };

    publicObj.clear = function () {
        cartItems = [];
        productsFactory.clearReservations();
    };

    return publicObj;
}]);