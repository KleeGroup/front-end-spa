/*global Backbone, _*/
var template = require('./templates/virtualMachine');
module.exports = Backbone.View.extend({
	tagName: 'div',
	template: template,

	initialize: function initializeVirtualMachine(){
		this.model.on('change', this.render);
		if(this.model.has('id')){
			this.model.fetch();
		}
		/*this.model.set({
			name: "toto",
			osId:1,
			nbCpu: 2,
			memory: 4,
			diskCapacity: 40,
			users: "toto, titi, tata",
			startDate: new Date(),
			endDate: moment().add('months',6).calendar()
		});*/

		this.osList = [{id:"1", name: "Windows 8"}, {id:"2", name: "Linux"}, {id:"3", name: "Mac os X"}];
	},

	render: function renderVirtualMachine(){
		var JsonModel = this.model.toJSON();
		_.extend(JsonModel,{
			osList : this.osList
		})
		this.$el.html(this.template(JsonModel));
		return this;
	}
});