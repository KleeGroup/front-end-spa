/* global Backbone, _ */
var template = require('./templates/reference');
module.exports = Backbone.View.extend({
	tagName: 'tr',
	template: template,
	/*Good practice fordebugging to name the anonymous function. In order to see it in the stack trace.*/
	initialize: function initializeReferenceView() {
		this.isEdit = false;
	},
	events: {
		"click button": "toogleEditMode"
	},
	toogleEditMode: function toogleEditMode(event) {
		console.log("toogle");
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