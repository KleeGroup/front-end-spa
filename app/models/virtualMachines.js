/*global Backbone*/
//Dependencies.
var URL = require('./URL');
var VirtualMachine = require('./virtualMachine');

//define a collection of virtual machines
module.exports = Backbone.Collection.extend({
	//A collection only need a model property in order to _Type_ each element of the collection.
	model: VirtualMachine,
	/*
		The url will  be use in order to do all the [CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete)
		operations on the model with the **REST** api. All operations will only exchange json between client and server.
	 */
	url: URL.virtualMachine
});

/*
## Example call.
```
var vm1 = { name: "VM1", nbCpu: 1, memory: "2GB", diskTypeId: 1, diskCapacity: "300GB", users: "user1, user2, user3", osId: 1, startDate: Date.now(), endDate: (Date.now() + 365*24*60*60*1000 )};//One Year
var vm2 = { name: "VM2", nbCpu: 2, memory: "2GB", diskTypeId: 2, diskCapacity: "400GB", users: "user1, user3", osId: 2, startDate: Date.now(), endDate: (Date.now() + 365*24*60*60*1000 )};//One Year
var VirtualMachines = require(./models/virtualMachines); //Here we have a refernce to a _class_.
var virtualMachines= new VirtualMachines([vm1, vm2]);// Here we have an instance of the collection.
console.log(virtualMachines.toJSON();)// display [{"name":"VM1","nbCpu":1,"memory":"2GB","diskTypeId":1,"diskCapacity":"300GB","users":"user1, user2, user3","osId":1,"startDate":1392496960535,"endDate":1424032960535},{"name":"VM2","nbCpu":2,"memory":"2GB","diskTypeId":2,"diskCapacity":"400GB","users":"user1, user3","osId":2,"startDate":1392496960535,"endDate":1424032960535}]
console.log(virtualMachines.where({name: "VM1"}));// Display [{"name":"VM1","nbCpu":1,"memory":"2GB","diskTypeId":1,"diskCapacity":"300GB","users":"user1, user2, user3","osId":1,"startDate":1392496960535,"endDate":1424032960535}]
//See [Backbone collection](http://backbonejs.org/#Collection) doc for more informations.
```
*/