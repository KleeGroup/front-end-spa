var NotImplementedException = require('../../lib/custom_exception').NotImplementedException;
var form_helper = require('../../lib/form_helper');
var ModelValidator = require('../../lib/model-validation-promise');

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
		this.searchResult = new this.Results();
		//handle the search action
		this.listenTo(this.searchResults, 'reset', this.renderSearchResult);
		//handle the clear criteria action
		this.listenTo(this.model, 'change', this.render);
		//initialization of the result view 
		this.searchResultsView = new this.ResultsView({
			model: this.searchResults
		});

		if (this.isSearchTriggered) {
			this.runSearch(null,{isFormBinded:false});
		}
	},

	events: {
		"submit form": 'runSearch',
		"click button#btnReset": 'clearSearchCriteria',
	},

	//get the JSON to attach to the template
	getRenderData: function getRenderDataSearch() {
		throw new NotImplementedException('getRenderData');
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
			.catch (currentView.model.setErrors)
			.then(function(model) {
				currentView.model.unsetErrors();
				currentView.search(this.model.toJSON())
					.then(currentView.searchResults.reset)
					.catch (function error(errorResponse) {
					ErrorHelper.manageResponseErrors(errorResponse, {
						isDisplay: true
					});
				});
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