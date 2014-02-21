/*global describe, it*/
require('../initialize-globals').load();
//Require the module to test.
var MetadataBuilder = require('../../app/lib/metadata_builder');
//Require the basic model and extend it.
var Mdl = require('../../app/models/model');
var Model = Mdl.extend({
	metadatas: {
		id: {
			metadata: {
				"domain": "DO_ID",
				"required": true
			}
		},
		name: {
			metadata: {
				"domain": "DO_ID",
				"required": false
			}
		},
		age: {
			metadata: {
				domain: "DO_ENTIER",
				required: false
			},
			required: true,
			isValidationOff: false
			//domain: ''
		},
		attrNoVal:{
			metadata:"DO_ID",
			isValidationOff: true
		}
	}
});


describe('# MetadataBuilder', function() {
	var model = new Model();
	var validators =  MetadataBuilder.domainAttributes(model);
	describe('## domainAttributes', function() {
		it('Should have validators for each property', function() {
			validators.should.have.property('id');
			validators.should.have.property('name');
			validators.should.have.property('age');
			//console.log("validators", validators);
		});
		it('Should have a required override on the validators.', function(){
			validators.should.have.property('age').be.an("Array").of.length(2);
			validators.age[0].should.have.a.property('type', "required");
			validators.age[0].should.have.a.property('value', true);
		});
		it('should override the domain validators with others.');
		it('should return no validation when isValidationOff:true is pass', function(){
			validators.should.not.have.a.property('attrNoVal');
		});
		it('should behave normally when isValidationOff:false', function(){
			var validators = MetadataBuilder.domainAttributes(model);
			validators.should.have.property('age').be.an("Array").of.length(2);
		});
	});
});