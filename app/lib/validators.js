var regex = {
	email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};
//Function to test an email.
function emailRegexValidation(emailToValidate) {
	return regex.email.test(emailToValidate);
}
//Function to test the length of a string.
function stringLength(stringToTest, options) {
	if ('string' !== typeof stringToTest) {
		return false;
	}
	options = options || {};
	options.minLength = options.minLength || 0;
	return stringToTest.length > options.minLength;
}
// Validations functions.
module.exports = {
	email: emailRegexValidation,
	stringLength: stringLength
};