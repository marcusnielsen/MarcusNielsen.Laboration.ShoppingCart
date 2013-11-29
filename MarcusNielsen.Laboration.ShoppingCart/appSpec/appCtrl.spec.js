describe('app controller', function () {
    var appCtrlMock;
    var appCtrlScope;

    beforeEach(module(function () {
        module("shoppingCartModule");
    }));

    beforeEach(inject(function ($rootScope, $controller) {
        appCtrlScope = $rootScope.$new();
        appCtrlMock = $controller(appCtrl, { $scope: appCtrlScope, shoppingCartFactory: '', productsFactory: '' });
    }));

    it('should be made by Marcus Nielsen', function () {
        expect(appCtrlScope.app.footerText).toBe("By Marcus Nielsen");
    });

    it('should have title "Shopping Cart"', function () {
        expect(appCtrlScope.app.title).toBe("Shopping Cart");
    });
});