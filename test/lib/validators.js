/*global describe, it*/
require('../initialize-globals').load();
var validator = require('../../app/lib/validators');
describe('Validator', function() {
  var validate = validator.validate;
  describe('#validate', function() {
    describe('##string', function() {
      var property = {
        name: "firstName",
        value: "pierre"
      },
        validator = {
          type: "string",
          options: {}
        };
      it('The minLength shoul be ok with a minLength 1', function() {
        validator.options.minLength = 1;
        var validationResult = validate(property, [validator]);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value', property.value);
        validationResult.should.have.property('isValid', true);
        validationResult.should.have.property('errors', undefined);
      });
      it('The minLength shoul be ko with a stringLength of 7', function() {
        validator.options.minLength = 7;
        var validationResult = validate(property, [validator]);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value', property.value);
        validationResult.should.have.property('isValid', false);
        validationResult.should.have.property('errors');
      });
      it('The maxLength should be ok with a stringLength of 7', function() {
        validator.options.maxLength = 7;
        var validationResult = validate(property, [validator]);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value', property.value);
        validationResult.should.have.property('isValid', true);
        validationResult.should.not.have.property('errors');
      });
      it('The maxLength  be ko with a stringLength of 1', function() {
        validator.options.maxLength = 1;
        var validationResult = validate(property, [validator]);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value', property.value);
        validationResult.should.have.property('isValid', false);
        validationResult.should.have.property('errors');
        console.log(validationResult);
      });
    });
  });
});