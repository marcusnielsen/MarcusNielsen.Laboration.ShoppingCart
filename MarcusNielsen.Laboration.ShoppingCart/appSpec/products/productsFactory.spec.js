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

    describe("find product by title", function () {

        it('should throw exception when a title is not found', function () {
            expect(function () {
                productsFactory.findProductByTitle("Hairy Tails");
            }).toThrow();
        });

        it('should return a product with correct title', function () {
            expect(productsFactory.findProductByTitle("Duck Tales").title).toEqual("Duck Tales");
        });

    });

    describe("handle reservation by title", function () {
        it("should ", function () { });
        it("", function () { });
        it("", function () { });
    });

    it('should be able to reserve existing product by title', function () {
        expect(productsFactory.reserveProductByTitle("Duck Tales")).toBe(true);
    });
});