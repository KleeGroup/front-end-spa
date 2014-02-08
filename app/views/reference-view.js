/* global Backbone, _ */
var template = require('./templates/reference');
module.exports = Backbone.View.extend({
	tagName: 'div',
	template: template,
	/*Good practice fordebugging to name the anonymous function. In order to see it in the stack trace.*/
	initialize: function initializeReferenceView() {
		this.isEdit = false;
	},
	events: {
		"button click": "toogleEditMode"
	},
	toogleEditMode: function toogleEditMode(event) {
		event.preventDefault();
		this.isEdit = !this.isEdit;
		this.render();
	},
	render: function renderVirtualMachine() {
		this.$el.html(
			this.template(
				_.extend(
					this.model.toJSON(), {
						isEdit: this.isEdit
					})
			));
		return this;
	}
});