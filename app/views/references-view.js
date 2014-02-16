/*global Backbone, $*/
var template = require('./templates/references');
var loading = require('./templates/loading');
var ReferenceView = require('./reference-view');
var RefSvc = require('../service/ServiceReferential');
var ErrorHelper = require('../lib/error_helper');

module.exports = Backbone.View.extend({
	tagName: 'div',
	template: template,
	events: {},
	initialize: function initializeReferences() {
		this.model.isSearched = false;
		this.listenTo(this.model, 'reset', this.render);
		var collection = this.model;
		RefSvc.loadAll().then(function success(jsonColl) {
			collection.isSearched = true;
			collection.reset(jsonColl);
		}, function error(errorResponse) {
			ErrorHelper.manageResponseErrors(errorResponse, {
				isDisplay: true
			});
		});
	},
	/*How to deal with the add one medhot.*/
	addOne: function addOneRefernceView(model) {
		$("table tbody", this.$el).append(new ReferenceView({
			model: model
		}).render().el);
	},
	render: function renderReferencesView() {
		//the template must have named property to iterate over it
		this.$el.html(this.template());
		if (this.model.isSearched) {
			this.model.forEach(this.addOne, this);
		}else{
			$("table tbody", this.$el).append(loading());
		}
		return this;
	}
});