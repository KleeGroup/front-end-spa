/* global Promise */
var Reference = require('../models/reference');
var reference = new Reference();
// var References = require('../models/references');
// var references = new References();

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


function loadReferences(collection) {
	new Promise(function(resolve, reject) {
		collection.fetch({
			success: resolve,
			error: reject
		});
	}).then(function success(argument) {
		console.log('success promise fetch', argument);
		collection.reset(argument.toJSON());
	}, function error(err) {
		console.log("error promise fetch", err);
	});
}
module.exports = {
	save: saveReference,
	loadAll: loadReferences
};