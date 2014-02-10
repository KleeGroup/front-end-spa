/*global Backbone, $*/
var template = require('./templates/references');
var ReferenceView = require('./reference-view');
module.exports = Backbone.View.extend({
	tagName: 'div',
	template: template,
	events: {},
	/*How to deal with the add one medhot.*/
	addOne: function addOneRefernceView(model) {
		$("table tbody", this.$el).append(new ReferenceView({
			model: model
		}).render().el);
	},
	render: function renderReferencesView() {
		//the template must have named property to iterate over it
		this.$el.html(this.template());
		this.model.forEach(this.addOne, this);
		return this;
	}
});