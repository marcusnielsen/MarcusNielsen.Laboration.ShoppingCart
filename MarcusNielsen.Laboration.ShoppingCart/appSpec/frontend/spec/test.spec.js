describe('Start page', function() {
  var ptor = protractor.getInstance();

  beforeEach(function() {
    ptor.get('#/');
  });

  it('should have a focused product with title Mega Man', function() {
    var title = ptor.findElement(protractor.By.binding('products.getFocusedProduct().title'));
    expect(title.getText()).toEqual('Mega Man');
  });
});