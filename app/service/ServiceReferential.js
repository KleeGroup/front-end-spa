/* global Promise */
var Reference = require('../models/reference');
var reference = new Reference();
// var References = require('../models/references');
// var references = new References();
var Promisify = require('../models/promisify');
var promiseCollection = new Promisify.Collection();
promiseCollection.url = reference.url;

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
	promiseCollection.reset(collection.toJSON());
	promiseCollection.fetch().then(function success(jsonResponse) {
		console.log('success promisify fetch', jsonResponse);
		collection.reset(jsonResponse);
	}, function error(err) {
		console.log("error promisify fetch", err);
	});
	// new Promise(function(resolve, reject) {
	// 	collection.fetch({
	// 		success: resolve,
	// 		error: reject
	// 	});
	// }).then(function success(argument) {
	// 	console.log('success promise fetch', argument);
	// 	collection.reset(argument.toJSON());
	// }, function error(err) {
	// 	console.log("error promise fetch", err);
	// });
}
module.exports = {
	save: saveReference,
	loadAll: loadReferences
};