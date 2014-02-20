/*global describe, it*/
require('../initialize-globals').load();
var Mdl = require('../../app/models/model');
var MetadataBuilder = require('../../app/lib/metadata_builder');
console.log(MetadataBuilder);
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
			required: true
			//domain: ''
		}
	}
});


describe('# MetadataBuilder', function() {
	var model = new Model();
	describe('## domainAttributes', function() {
		it('Model should ', function() {
			var validators = MetadataBuilder.domainAttributes(model);
			validators.should.have.property('id');
			validators.should.have.property('name');
			validators.should.have.property('age');
			console.log("validators", validators);
		});

	});
});