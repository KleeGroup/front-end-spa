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
	},
	//{ method: 'POST', path: '/vm', config: { handler: addProduct, payload: 'parse', schema: { name: Types.String().required().min(3) }, response: { id: Types.Number().required() } } }
];

var vms = [{
	id: 1,
	name: 'VM1',
	nbCpu: 2,
	memory: 1000,
	diskTypeId: 1,
	diskCapacity: 300,
	users: undefined,
	osId: 3
}, {
	id: 2,
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