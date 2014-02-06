# Put your handlebars.js helpers here.

Handlebars.registerHelper 'pick', (val, options) ->
	return options.hash[val]

#use in order to use the translation system in the view.
Handlebars.registerHelper "t", (i18n_key, options) ->
 new Handlebars.SafeString(i18n.translate(i18n_key))