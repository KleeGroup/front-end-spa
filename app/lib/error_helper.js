/*global _*/
var BackboneNotification = require('./backbone_notification');
// transform errors send by API to application errors.
function manageResponseErrors(response, options) {
	options = options || {};
	var responseErrors = response.responseJSON;
	/**/
	var globalErrors = [];
	var fieldErrors = {};
	if (responseErrors !== undefined && responseErrors !== null) {
		/*Case of an HTTP Error (as an example 404).*/
		if (responseErrors.error !== undefined && responseErrors !== null) {
			//The response json should have the following structure : {statusCode: 404, error: "Not Found"}
			globalErrors.push({
				type: "error",
				message: '' + responseErrors.statusCode + ' ' + responseErrors.error,
				creationDate: Date.now()
			});
		} else if (responseErrors.errors !== undefined) {
			// there errors in the response
			_.each(responseErrors.errors, function(error) {
				if (error.fieldName !== undefined && error.fieldName.length > 0) {
					fieldErrors[error.fieldName] = error.message;
				} else {
					globalErrors.push(error.message);
				}
			});
		}
	}
	//If there is no errors, do nothing.
	if ((_.isEmpty(fieldErrors) && _.isEmpty(globalErrors))) {
		return null;
	} else {
		var errors = {
			fieldErrors: fieldErrors,
			globalErrors: globalErrors
		};
		//If the display options is passed in argument, we display the options.
		if(options.isDisplay){
			displayErrors(errors);
		}
		return errors;
	}
}


function displayErrors(errors) {
	if (errors !== undefined && errors.globalErrors !== undefined) {
		BackboneNotification.addNotification(errors.globalErrors, true);
	}
}
module.exports = {
	manageResponseErrors: manageResponseErrors,
	display: displayErrors
};