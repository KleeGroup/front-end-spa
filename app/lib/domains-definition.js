module.exports = {
	"virtualMachine": {
		"name": {
			"domain": "DO_TEXTE_50",
			"required": true
		},
		"nbCpu": {
			"domain": "DO_ENTIER",
			"required": true
		},
		"osId": {
			"domain": "DO_ID",
			"required": true
		},
		"memory": {
			"domain": "DO_ENTIER",
			"required": true
		},
		"diskCapacity": {
			"domain": "DO_ENTIER",
			"required": true
		},
		"users": {
			"domain": "DO_LIST",
			"required": true
		},
		"startDate": {
			"domain": "DO_DATE",
			"required": true
		},
		"endDate": {
			"domain": "DO_DATE"
		}
	},
	"virtualMachineSearch": {
		"name": {
			"domain": "DO_TEXTE_30",
			"required": true
		}
	}
};