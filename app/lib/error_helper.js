// transform errors send by API to application errors.
function manageResponseErrors(response){
	var responseErrors = response.responseJSON;
	if(responseErrors != undefined && responseErrors.errors != undefined){
		// there errors in the response
		var globalMessages = []
		var fieldErrors = {}
		_.each(responseErrors.errors, function(error){
			if(error.fieldName != undefined && error.fieldName.length > 0){
				fieldErrors[error.fieldName] = error.message
			}else{
				globalMessages.push(error.message)
			}
		});
		return {
			fieldErrors: fieldErrors,
			globalErrors: globalMessages
		}
	}
	//no errors in response
	return null;
}

module.exports = {
	manageResponseErrors: manageResponseErrors
}