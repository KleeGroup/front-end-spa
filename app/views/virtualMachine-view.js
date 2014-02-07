var template = require('./templates/virtualMachine');
module.exports = Backbone.View.extend({
	tagName: 'div',
	template: template,

	initialize: function initializeVirtualMachine(){
		this.model.set({
			name: "toto",
			nbCpu: 2,
			memory: 4,
			diskCapacity: 40,
			users: "toto, titi, tata",
			startDate: new Date(),
			endDate: moment().add('months',6).calendar()
		});
	},

	render: function renderVirtualMachine(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});