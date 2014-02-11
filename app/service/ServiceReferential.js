var Reference = require('../models/reference');
var reference = new Reference();
// var References = require('../models/references');
// var references = new References();

function saveReference(model) {
	reference.clear({
		silent: true
	});
	reference.save(model.toJSON(), {
		success: function(newModel, response) {
			model.trigger('save:success', newModel);
		},
		error: function(model, response) {
			model.trigger('save:error', response);
		}
	});
}


function loadReferences(collection) {
	collection.fetch({
		reset: true
	});
}
module.exports = {
	save: saveReference,
	loadAll: loadReferences
};