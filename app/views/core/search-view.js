var NotImplementedException = require('../../lib/custom_exception').NotImplementedException;
var form_helper = require('../../lib/form_helper');
var ModelValidator = require('../../lib/model-validation-promise');
var ErrorHelper = require('../../lib/error_helper');

module.exports = Backbone.View.extend({
	tagName: 'div',
	className: 'searchView',
	ResultsView: undefined,
	Results: undefined,
	search: undefined,
	resultsSelector: 'div#results',

	initialize: function initializeSearch(options) {
		options = options || {};
		this.isSearchTriggered = options.isSearchTriggered || false;
		this.isReadOnly = options.isReadOnly || false;
		this.model.set({isCriteriaReadonly: false});

		//init results collection
		this.searchResults = new this.Results();
		//handle the clear criteria action
		this.listenTo(this.model, 'change', this.render);
		//initialization of the result view 
		this.searchResultsView = new this.ResultsView({
			model: this.searchResults,
			criteria : this.model
		});
		this.listenTo(this.searchResultsView, 'results:fetchDemand', function(){this.runSearch(null,{isFormBinded:false});});
		if (this.isSearchTriggered) {
			this.runSearch(null,{isFormBinded:false});
		}
	},

	events: {
		"submit form": 'runSearch',
		"click button#btnReset": 'clearSearchCriteria',
		"click button#btnEditCriteria": 'editCriteria',
	},

	//get the JSON to attach to the template
	getRenderData: function getRenderDataSearch() {
		throw new NotImplementedException('getRenderData');
	},

	editCriteria: function editCriteria(){
		this.model.set({isCriteriaReadonly: false});
	},

	searchSuccess: function searchSuccess(jsonResponse) {
		//this.searchResults.reset(jsonResponse);
		//TODO response ODATA
		this.searchResults.setTotalRecords(jsonResponse.totalRecords);
		this.searchResults.reset(jsonResponse.values);
	},

	searchError: function searchError(response) {
		ErrorHelper.manageResponseErrors(response, {
			isDisplay: true
		});
	},

	runSearch: function runSearch(event, options) {
		if(event !== undefined && event !== null){
			event.preventDefault();	
		}
		options = options || {};
		var isFormBinded = options.isFormBinded || true;
		//bind form fields on model
		if (isFormBinded) {
			form_helper.formModelBinder({
				inputs: $('input', this.$el)
			}, this.model);
		}
		var currentView = this;
		ModelValidator.validate(this.model)
			.then(function(model) {
				currentView.model.unsetErrors();
				currentView.search(currentView.model.toJSON(), currentView.searchResults.pageInfo())
				.then(function success(jsonResponse) { 
						return currentView.searchSuccess(jsonResponse);
					})
					.catch (function error(errorResponse) {
						currentView.searchError(errorResponse);
					});
			})
			.catch (function error(errors){
				currentView.model.setErrors(errors);
			});
		if(this.isReadOnly){
			this.model.set({isCriteriaReadonly: true});
		}
	},

	clearSearchCriteria: function clearSearchCriteria(event) {
		event.preventDefault();
		//Backbone.Notification.clearNotifications();
		this.model.clear();
	},

	render: function renderSearch() {
		this.$el.html(this.template(this.getRenderData()));
		$(this.resultsSelector, this.$el).html(this.searchResultsView.render().el);
		return this;
	}
});
