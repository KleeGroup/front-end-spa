var Hapi  = require('hapi');
///var Types = require('hapi').Types;
module.exports = [{
	method: 'GET',
	path: '/vm',
	config: {
		handler: getVms
		// query: {
		// 	name: Types.String()
		// }
	}
}, {
	method: 'GET',
	path: '/vm/{id}',
	config: {
		handler: getVm
	}
}, {
	method: 'POST',
	path: '/vm',
	config: {
		handler: addVm,
		validate: {
			payload: {
				name: Hapi.types.String().required().min(3)
			}
		}
	}
}];

var vms = [{
	id: 0,
	name: 'VM1',
	nbCpu: 2,
	memory: 1000,
	diskTypeId: 1,
	diskCapacity: 300,
	users: undefined,
	osId: 3
}, {
	id: 1,
	name: 'VM2',
	nbCpu: 4,
	memory: 2000,
	diskTypeId: 1,
	diskCapacity: 300,
	users: undefined,
	osId: 1
}];

function getVms(request, reply) {
	if (request.query.name) {
		reply(vms);
	} else {
		reply(vms);
	}
}

function getVm(request, reply) {
	reply(vms[request.params.id]);
}

function addVm(request, reply) {

	var vm = {
		id: vms[vms.length - 1].id + 1,
		name: request.payload.name,
		nbCpu: 4,
		memory: 2000,
		diskTypeId: 1,
		diskCapacity: 300,
		users: undefined,
		osId: 1
	};

	vms.push(vm);

	reply(vm).code(201).header('Location', '/products/' + vm.id);
}