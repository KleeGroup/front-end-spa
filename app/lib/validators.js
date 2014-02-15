var regex = {
	email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	number: /^-?\d+(?:\.d*)?(?:e[+\-]?\d+)?$/i
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
//Function to  validate that an input is a number.
function numberRegexValidation(numberToValidate, options){
	options = options || options;
	numberToValidate = ''+numberToValidate;//Cast it into a number.
	return regex.number.test(numberToValidate);
}
// Validations functions.
module.exports = {
	email: emailRegexValidation,
	stringLength: stringLength,
	number: numberRegexValidation
};