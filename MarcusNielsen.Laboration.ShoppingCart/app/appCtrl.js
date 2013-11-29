var appCtrl = function ($scope, shoppingCartFactory, productsFactory) {
    $scope.app = {
        title: 'Shopping Cart',
        footerText: 'By Marcus Nielsen'
    };

    $scope.shoppingCart = shoppingCartFactory;
    $scope.products = productsFactory;
};