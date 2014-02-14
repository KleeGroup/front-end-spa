/*global Backbone, Promise*/
var PromiseModel = Backbone.Model.extend({
	//Ovverride the save method on the model in order to Return a promise.
	save: function saveModel() {
		var model = this;
		return new Promise(
			function(resolve, reject) {
				Backbone.Model.prototype.save(model.toJSON(), {
					success: resolve,
					error: reject
				});
			}
		);
	}

});

var PromiseCollection = Backbone.Collection.extend({
	//Ovverride the default collection fetch method, using and returning a promise.
	fetch: function promiseFetchCollection() {
		var collection = this;
		return new Promise(function(resolve, reject) {
			Backbone.sync('read', collection, {success: resolve, error: reject});
		});
	}
});


module.exports = {
	Model: PromiseModel,
	Collection: PromiseCollection
};