var Hapi = require('hapi');
///var Types = require('hapi').Types;
module.exports = [{
	method: 'GET',
	path: '/reference',
	config: {
		handler: getRefs
	}
}, {
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
		/*validate: {
			payload: {
				name: Hapi.types.String().required().min(3)
			}
		}*/
	}
}, {
	method: 'PUT',
	path: '/vm',
	config: {
		handler: updateVm
	}
}];

var references = [{
	id: 1,
	name: 'Linux',
	translationKey: 'linux'
}, {
	id: 2,
	name: 'Windows',
	translationKey: 'windows'
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
}, {
	id: 2,
	name: 'VM3',
	nbCpu: 4,
	memory: 3000,
	diskTypeId: 1,
	diskCapacity: 300,
	users: undefined,
	osId: 1
},{
	id: 3,
	name: 'VM4',
	nbCpu: 4,
	memory: 4000,
	diskTypeId: 1,
	diskCapacity: 300,
	users: undefined,
	osId: 1
}];

function getRefs(request, reply) {
	reply(references);
}

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

	reply(vm).code(201);
}

function updateVm(request, reply) {
	console.log('Update VM', request, reply);
	vms[vms.request.payload.id] = request.payload;
	reply(request.payload).code(200);
}