/* global Promise */
var Reference = require('../models/reference');
var References = require('../models/references');
var Promisify = require('../models/promisify');
/*Instances of both model and collection of virtual machines.*/
var promiseReference = Promisify.Convert.Model(new Reference());
var promiseReferences = Promisify.Convert.Collection(new References());

function saveReference(jsonModel) {
	promiseReference.clear({
		silent: true
	});
	return promiseReference.save(jsonModel);
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