describe("products factory", function () {
    var productsFactory;
    var jsonProductFeedResultMockFactory;

    beforeEach(function () {
        module('shoppingCartModule');

        module(function ($provide) {
            $provide.factory('jsonProductFeedResultMockFactory', function () {
                return {
                    products: [{
                        title: 'Duck Tales'
                    }]
                };
            });
        });

        inject(function (_productsFactory_, _jsonProductFeedResultMockFactory_) {
            productsFactory = _productsFactory_;
            jsonProductFeedResultMockFactory = _jsonProductFeedResultMockFactory_;
        });
    });

    it('should throw exception when a title is not found', function () {
        expect(function () {
            productsFactory.findProductByTitle("Hairy Tails");
        }).toThrow();
    });

    it('should be able to reserve existing product by title', function () {
        expect(productsFactory.reserveProductByTitle("Duck Tales")).toBe(true);
    });
});