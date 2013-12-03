describe("shopping cart factory", function () {
    var shoppingCartFactory;
    var $log;
    var productsFactory;

    beforeEach(function () {
        module("shoppingCartModule");

        inject(function ($injector) {
            shoppingCartFactory = $injector.get("shoppingCartFactory");
            $log = $injector.get("$log");
            productsFactory = $injector.get("productsFactory");
        });
    });

    describe("add to cart", function () {
        it("should log a warning", function () {
           // TODO:
        });
    });
});