/* global Promise */
var Reference = require('../models/reference');
var References = require('../models/references');
var Promisify = require('../models/promisify');
/*Instances of both model and collection of virtual machines.*/
var promiseReference = Promisify.Convert.Model(new Reference());
var promiseReferences = Promisify.Convert.Collection(new References());

function saveReference(model) {
	reference.clear({
		silent: true
	});

	new Promise(function(resolve, reject) {
		reference.save(model.toJSON(), {
			success: resolve,
			error: reject
		});
	}).then(function success(argument) {
		console.log("Success", argument);
	}, function(error) {
		console.log("error", error);
	});
}

//Load all the references of the application
function loadReferences() {
	promiseReferences.reset(null, {silent: true});
	return promiseReferences.fetch();
}
module.exports = {
	save: saveReference,
	loadAll: loadReferences
};