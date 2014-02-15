/*global Backbone*/
//Dependencies.
var URL = require('./URL');
var VirtualMachine = require('./virtualMachine');

//define a collection of virtual machines
module.exports = Backbone.Collection.extend({
	//A collection only need a model property in order to _Type_ each element of the collection.
	model: VirtualMachine,
	//The url will  be use in order to do all the [CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete)
	// operations on the model with the REST api. All operations will only exchange json between client and server.s
	url: URL.virtualMachine
});