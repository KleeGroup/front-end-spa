/*global describe, it*/
require('../initialize-globals').load();
var validator = require('../../app/lib/validators');
describe('Validator', function() {
  var validate = validator.validate;
  describe('#validate', function() {
    describe('##required', function() {
      var property = {
        name: "papa",
        value: undefined
      },
        validator = {
          type: "required",
          value: undefined,
          options: {}
        };
      it("property undefined required false", function() {
        property.value = undefined;
        validator.value = false;
        var validationResult = validate(property, [validator]);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.not.have.property('value');
        validationResult.should.have.property('isValid', true);
        validationResult.should.have.property('errors', undefined);
      });
      it("property undefined required true", function() {
        property.value = undefined;
        validator.value = true;
        var validationResult = validate(property, [validator]);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.not.have.property('value');
        validationResult.should.have.property('isValid', false);
        validationResult.should.have.property('errors').be.an('Array');
      });
      it("property defined required false", function() {
        property.value = "singe";
        validator.value = false;
        var validationResult = validate(property, [validator]);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value', property.value);
        validationResult.should.have.property('isValid', true);
        validationResult.should.have.property('errors', undefined);
      });
      it("property defined required false", function() {
        property.value = "singe";
        validator.value = true;
        var validationResult = validate(property, [validator]);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value', property.value);
        validationResult.should.have.property('isValid', true);
        validationResult.should.have.property('errors', undefined);
      });

    });
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
        validator.options.minLength = 0;
        validator.options.maxLength = 7;
        var validationResult = validate(property, [validator]);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value', property.value);
        validationResult.should.have.property('isValid', true);
        validationResult.should.have.property('errors', undefined);
        console.log(validationResult);
      });
      it('The maxLength  be ko with a stringLength of 1', function() {
        validator.options.maxLength = 1;
        var validationResult = validate(property, [validator]);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value', property.value);
        validationResult.should.have.property('isValid', false);
        validationResult.should.have.property('errors');

      });
    });
    describe('##regex', function() {
      var property = {
        name: "email",
        value: "pierre@pierr.com"
      },
        validator = {
          type: "regex",
          options: {}
        };
      it("should validate with a regex", function() {
        validator.value = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var validationResult = validate(property, [validator]);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value', property.value);
        validationResult.should.have.property('isValid', true);
        validationResult.should.have.property('errors', undefined);
      });
      it("should invalidate with a regex", function() {
        property.value = "sjhbcbdjbvjhds";
        validator.value = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var validationResult = validate(property, [validator]);
        //console.log(validationResult);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value', property.value);
        validationResult.should.have.property('isValid', false);
        validationResult.should.have.property('errors').to.be.an('Array');
      });

    });
  });
});