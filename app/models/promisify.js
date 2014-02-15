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
	//Options is the options object which is sent to the jquery method.
	fetch: function promiseFetchCollection(options) {
		options = options || {};
		var collection = this;
		return new Promise(function(resolve, reject) {
			/*Don't use underscore but could have because bacckbone has a dependency on it.*/
			options.success = resolve;
			options.error = reject;
			Backbone.sync('read', collection, options);
		});
	}
});


module.exports = {
	Model: PromiseModel,
	Collection: PromiseCollection
};