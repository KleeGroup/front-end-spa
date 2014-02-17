/*global describe, it*/
require('../initialize-globals').load();
var Model = require('../../app/models/model').extend({
  validation: {
    firstName: {required: true}
  }
});
var ModelValidator = require('../../app/lib/model-validation-promise');
describe('default model', function() {
  var model = new Model({
    firstName: "Pierre",
    lastName: "Besson"
  });
  describe('#validate', function() {
    it('The validation shoul be ok', function(done) {
      ModelValidator.validate(model).then(function(modelSuccess) {
        modelSuccess.toJSON().should.have.property('firstName', 'Pierre');
        done();
      });
    });
    it('The validation shoul be ko', function(done) {
      model.unset('firstName', {silent: true});
      ModelValidator.validate(model).catch(function(error) {
          error.should.have.property('firstName', 'firstName not valid.');
        done();
      });
    });
  });
});

