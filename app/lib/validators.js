var regex = {
	email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	number: /^-?\d+(?:\.d*)?(?:e[+\-]?\d+)?$/i
};

//Function to test an email.
function emailValidation(emailToValidate) {
	return regex.email.test(emailToValidate);
}

//Function to test the length of a string.
function stringLength(stringToTest, options) {
	if ('string' !== typeof stringToTest) {
		return false;
	}
	options = options || {};
	var isMinLength = options.minLength ? stringToTest.length > options.minLength : true;
	var isMaxLength = options.maxLength ? stringToTest.length < options.maxLength : true;
	return isMinLength && isMaxLength;
}
//Function to  validate that an input is a number.
function numberValidation(numberToValidate, options){
	options = options || options;
	numberToValidate = ''+numberToValidate;//Cast it into a number.
	return regex.number.test(numberToValidate);
}

//Validate a property, a property shoul be as follow: `{name: "field_name",value: "field_value", validators: [{...}] }`
var validate = function(property, validators) {
  //console.log("validate", property, validators);
  var errors, res, validator, _i, _len;
  errors = [];
  for (_i = 0, _len = validators.length; _i < _len; _i++) {
    validator = validators[_i];
    res = validateProperty(property, validator);
    if (res != null) {
      errors.push(res);
    }
  }
  return {
    name: property.name,
    value: property.value,
    isValid: errors.length === 0,
    errors: errors
  };
};

var validateProperty = function(property, validator) {
  var isValid;
  if (validator == null) {
    return void 0;
  }
  if (property == null) {
    return void 0;
  }
  isValid = (function() {
    switch (validator.type) {
      case "required":
        return property.value != null;
      case "regex":
        return validator.value.match(property.value);
      case "email":
        return emailValidation(property.value, validator.options);
      case "number":
        return numberValidation(property.value, validator.options);
      case "string":
        return stringLength(property.value, validator.options);
      case "function":
        return validator.value(property.value, validator.options);
      default:
        return void 0;
    }
  })();
  if (!isValid) {
    return "The property " + property.name + " is invalid.";
  }
};

// Validations functions.
module.exports = {
	email: emailValidation,
	stringLength: stringLength,
	number: numberValidation,
	validate: validate
};