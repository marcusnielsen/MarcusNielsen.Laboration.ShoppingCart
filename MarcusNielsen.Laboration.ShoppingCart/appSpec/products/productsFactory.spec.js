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

    it('should not be able to reserve product by title when not in database', function () {
        expect(function () {
            productsFactory.reserveProductByTitle("Hairy Tails");
        }).toThrow();
    });

    it('should be able to reserver product by title', function () {
        expect(productsFactory.reserveProductByTitle("Duck Tales")).toBe(true);
    });
});