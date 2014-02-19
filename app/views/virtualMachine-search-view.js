/*global Backbone, $, i18n*/

var template = require('./templates/virtualMachine-search');
var VirtualMachines = require('../models/virtualMachines');
var VirtualMachineResultsView = require("./virtualMachine-results-view");
var form_helper = require('../lib/form_helper');
var VmSvc = require('../service/ServiceVirtualMachine');
var ErrorHelper = require('../lib/error_helper');

module.exports = Backbone.View.extend({
	tagName: 'div',
	template: template,

	initialize: function initializeVirtualMachineSearch() {
		this.searchResults = new VirtualMachines();

		//The view subscribe to the validation event of the model.
		this.listenTo(this.model, 'validated:valid', this.modelValid);
		this.listenTo(this.model, 'validated:invalid', this.modelInValid);
		//handle the clear criteria action
		this.listenTo(this.model, 'change', this.render);
		//init resluts view
		this.virtualMachineResultsView = new VirtualMachineResultsView({model: this.searchResults});
	},

	events: {
		"submit form": 'searchVirtualMachine',
		"click button#resetBtn": 'clearSearchCriteria',
	},

	render: function renderVirtualMachineSearch() {
		this.$el.html(this.template(this.model.toJSON()));
		$('div#results', this.$el).html(this.virtualMachineResultsView.render().el);
		return this;
	},

	searchVirtualMachine: function searchVirtualMachine(event) {
		event.preventDefault();
		//bind form fields on model
		form_helper.formModelBinder({
			inputs: $('input', this.$el)
		}, this.model);
		this.model.validate();
	},

	//When there is a validation problem, we put the errors into the model in order to display them in the form.
	modelInValid: function searchModelInValid(model, errors) {
		this.model.set({
			'errors': errors
		});
		this.render();
	},

	//When the model is valid, the  process continue.
	modelValid: function modelValid(model) {
		this.model.unset('errors');
		/*Call the service in otder to fetch correctly the results.*/
		/*This service return a promise.*/
		var vmSearchView = this;
		VmSvc.search(this.model.toJSON())
			.then(function success(jsonResponse) {
				return vmSearchView.searchResults.reset(jsonResponse);
			}, function error(errorResponse){
				ErrorHelper.manageResponseErrors(errorResponse, {isDisplay: true});
			});
	},

	clearSearchCriteria: function clearSearchCriteria(event) {
		event.preventDefault();
		//Backbone.Notification.clearNotifications();
		this.model.clear();
	}
});