shoppingCartModule.controller('appCtrl', ['$scope', 'shoppingCartFactory', 'productsFactory', function ($scope, shoppingCartFactory, productsFactory) {
    $scope.app = {
        title: 'Shopping Cart',
        footerText: 'By Marcus Nielsen'
    };

    $scope.shoppingCart = shoppingCartFactory;
    $scope.products = productsFactory;
}]);