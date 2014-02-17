module.exports = {
	"DO_ENTIER": {
		"type": "number",
		"validation": [{
			"type": "regex",
			"value": "^\\d+$"
		}],
	},
	"DO_DATE": {
		"type": "date",
		"validation": [{
			"type": "name",
			"value": "date"
		}]
	},
	"DO_TEXTE_50": {
		"type": "text",
		"validation": [{
			"type": "regex",
			"value": "^\\+$"
		}]
	},
	"DO_LISTE": {
		"type": "number",
		"validation": [{
			"type": "regex",
			"value": "^\\+$"
		}]
	},
	"DO_ID": {
		"type": "text",
		"validation": [{
			"type": "regex",
			"value": "^\\+$"
		}]
	},
	"DO_TEXTE_30": {
		"type": "text",
		"validation": [{
			"type": "regex",
			"value": "^\\+$"
		}]
	}

};