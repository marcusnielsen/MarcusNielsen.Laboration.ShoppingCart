describe("products factory", function () {
    var productsFactory;
    var jsonProductFeedResultMockFactory;

    beforeEach(function () {
        module("shoppingCartModule");

        inject(function ($injector) {
            productsFactory = $injector.get("productsFactory");
        });
    });

    describe("find product by title", function () {
        it("should throw exception when a title is not found", function () {
            expect(function () {
                productsFactory.findProductByTitle("Hairy Tails");
            }).toThrow();
        });

        it("should return a product with correct title", function () {
            expect(productsFactory.findProductByTitle("Duck Tales").title).toEqual("Duck Tales");
        });
    });

    describe("handle reservation by title", function () {
        it("should return the correct value when there is no reservations", function () {
            expect(productsFactory.handleReservationByTitle("Duck Tales", function () {
                return true;
            }, null, null)).toBe(true);
        });

        it("should return the correct value when there is available products", function () {
            productsFactory.reserveProductByTitle("Duck Tales");


            expect(productsFactory.handleReservationByTitle("Duck Tales", null, function () {
                return true;
            }, null)).toBe(true);
        });

        it("should return the correct value when there is no available products", function () {
            productsFactory.reserveProductByTitle("Duck Tales");
            productsFactory.reserveProductByTitle("Duck Tales");

            expect(productsFactory.handleReservationByTitle("Duck Tales", null, null, function () {
                return true;
            })).toBe(true);
        });
    });

    describe("is available by title", function () {

    });

    describe("reserve product by title", function () {
        it("should be able to reserve existing product by title", function () {
            expect(productsFactory.reserveProductByTitle("Duck Tales")).toBe(true);
        });
    });

    describe("clear reservations", function () {

    });

    describe("get products", function () {

    });

    describe("get focused product", function () {

    });
});