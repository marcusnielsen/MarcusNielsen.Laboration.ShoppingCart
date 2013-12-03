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
        it("should return true when there is a product available", function () {
            expect(productsFactory.isAvailableByTitle("Duck Tales")).toBe(true);
        });

        it("should return false when there is no product available", function () {
            productsFactory.reserveProductByTitle("Duck Tales");
            productsFactory.reserveProductByTitle("Duck Tales");

            expect(productsFactory.isAvailableByTitle("Duck Tales")).toBe(false);
        });
    });

    describe("reserve product by title", function () {
        it("should return true when reserving available product", function () {
            expect(productsFactory.reserveProductByTitle("Duck Tales")).toBe(true);
        });

        it("should return false if no product is available", function () {
            productsFactory.reserveProductByTitle("Duck Tales");
            productsFactory.reserveProductByTitle("Duck Tales");

            expect(productsFactory.reserveProductByTitle("Duck Tales")).toBe(false);
        });
    });

    describe("clear reservations", function () {
        it("should contain zero reservations when clearing reservations", function () {
            productsFactory.reserveProductByTitle("Duck Tales");
            productsFactory.reserveProductByTitle("Duck Tales");
            productsFactory.clearReservations();

            productsFactory.reserveProductByTitle("Duck Tales");
            var secondReservation = productsFactory.reserveProductByTitle("Duck Tales");
            var thirdResrvation = productsFactory.reserveProductByTitle("Duck Tales");

            expect(secondReservation).toBe(true);
            expect(thirdResrvation).toBe(false);
        });
    });

    describe("get products", function () {
        it("should return all products when no title is given", function () {
            expect(productsFactory.getProducts().length).toBe(3);
        });
        it("should return the first product with matching title when a title is given", function () {
            expect(productsFactory.getProducts("Duck Tales").title).toBe("Duck Tales");
        });
        it("should return all products that match a title when many titles are given", function () {
            expect(productsFactory.getProducts(["Duck Tales", "Mega Man"]).length).toBe(2);
        });
    });

    describe("get focused product", function () {
        it("should return the product with most available products after reservations are deducted", function () {
            productsFactory.reserveProductByTitle("Mega Man");
            productsFactory.reserveProductByTitle("Mega Man");
            productsFactory.reserveProductByTitle("Mega Man");

            expect(productsFactory.getFocusedProduct().title).toBe("Duck Tales");
        });
    });
});