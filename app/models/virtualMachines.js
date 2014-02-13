/*global Backbone*/
var URL = require('./URL');
var VirtualMachine = require('./virtualMachine');

//define a collection of virtual machines
/*module.exports = Backbone.Collection.extend({
	model: VirtualMachine,
	url: URL.virtualMachine
});*/

module.exports = Backbone.PageableCollection.extend({
	model: VirtualMachine,
	url: URL.virtualMachine,
	mode: "client"
});