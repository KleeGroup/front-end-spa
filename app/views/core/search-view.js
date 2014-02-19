var NotImplementedException = require('../lib/custom_exception').NotImplementedException;
var form_helper = require('../lib/form_helper');
var ModelValidator = require('../lib/model-validation-promise');

module.exports = Backbone.View.extend({
	tagName: 'div',
	className: 'searchView',
	ResultsView: undefined,
	Results: undefined,
	resultsSelector: 'div#results',

	initialize: function initializeSearch(options) {
		//init results collection
		this.searchResult = new Results();
		//handle the search action
		this.listenTo(this.searchResults, 'reset', this.renderSearchResult);
		//handle the clear criteria action
		this.listenTo(this.model, 'change', this.render);
		//initialization of the result view 
		this.searchResultsView = new ResultsView({
			model: this.searchResults
		});
	},

	getRenderData: function getRenderDataSearch() {
		throw new NotImplementedException('getRenderData');
	},

	render: function renderSearch() {
		this.$el.html(this.template(this.getRenderData()));
		$(this.resultsSelector, this.$el).html(this.searchResultsView.render().el);
		return this;
	},

	searchVirtualMachine: function searchVirtualMachine(event) {
		event.preventDefault();
		//bind form fields on model
		form_helper.formModelBinder({
			inputs: $('input', this.$el)
		}, this.model);

		var vmSearchView = this;
		ModelValidator.validate(this.model).then(function(model) {
			VmSvc.search(this.model.toJSON())
				.then(function success(jsonResponse) {
					return vmSearchView.searchResults.reset(jsonResponse);
				}, function error(errorResponse) {
					ErrorHelper.manageResponseErrors(errorResponse, {
						isDisplay: true
					});
				});
		}, function(errors) {
			//validations errors
			this.model.set({
				'errors': errors
			});
		});
	},

	clearSearchCriteria: function clearSearchCriteria(event) {
		event.preventDefault();
		//Backbone.Notification.clearNotifications();
		this.model.clear();
	}
});