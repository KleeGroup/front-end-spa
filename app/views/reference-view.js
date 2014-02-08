/* global Backbone */
var template = require('./templates/reference');
module.exports = Backbone.View.extend({
	tagName: 'div',
	template: template,
	/*Good practice fordebugging to name the anonymous function. In order to see it in the stack trace.*/
	initialize: function initializeReferenceView() {
	},

	render: function renderVirtualMachine() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});