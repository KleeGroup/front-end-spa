/*global Backbone*/

var template = require('./templates/virtualMachine-search');
var VirtualMachines = require('../models/virtualMachines');

module.exports = Backbone.View.extend({
	tagName: 'div',
	template: template,

	initialize: function initializeVirtualMachineSearch() {
		this.searchResults = new VirtualMachines();

	},

	events: {

	},

	render: function renderVirtualMachineSearch() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});