/*global Backbone, Promise*/
var PromiseModel = Backbone.Model.extend({
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
	fetch: function promiseFetchCollection() {
		var collection = this;
		return new Promise(function(resolve, reject) {
			Backbone.sync('read', collection, {success: resolve, error: reject});
			// collection.fetch({
			// 	success: resolve,
			// 	error: reject
			// });
		});
	}
});


module.exports = {
	Model: PromiseModel,
	Collection: PromiseCollection
};