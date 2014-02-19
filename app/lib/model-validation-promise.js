/*global Promise, _*/
var ArgumentNullException = require("./custom_Exception").ArgumentNullException;
exports.validate = function(model) {
  var errors = {};
  //Looping through each attributes.
  validateCustomAttributes(model, errors);
  //Promisify the validations , if there is errors call the reject else call resolve with the model.
  return new Promise(function promiseValidation(resolve, reject) {
    //console.log("Errors", errors);
    if (_.isEmpty(errors)) {
      //console.log('resolve');
      resolve(model);
    } else {
      //console.log('reject');
      reject(errors);
    }
    return undefined;
  });
};

//Validate the model customs attributes.
var validateCustomAttributes = function validateCustomAttributes(model, errors) {
  if (!model) {
    throw new ArgumentNullException('The model should exist');
  }
  for (var attr in getValidatedAttrs(model)) {
    //console.log("Attr", attr);
    if (!model.isValid(attr)) {
      errors[attr] = attr + " not valid."; // Todo: translate the message.
    }
  }
};

//Get the validation "standard" attributes.
var getValidatedAttrs = function(model) {
  return _.reduce(_.keys(_.result(model, 'validation') || {}), function(memo, key) {
    memo[key] = void 0;
    return memo;
  }, {});
};

//Validate the validation domains attributes.
var validateDomainAttributes = function validateDomainAttributes(model, errors) {
  for (var attr in getDomainsValidationAttrs(model)) {

  }
};



//Get the domains definition.
var domains = require('./domains');
//Get the validation attributes from the domain.
var getDomainsValidationAttrs = function getDomainsValidationAttrs(model) {
  if (!model) {
    return new ArgumentNullException('The model should exists and have a metadatas property.');
  }
  //Get the metadatas from the model.
  var metadatas = model.metadatas;
  if (!metadatas) {
    if (!tryConstructModelMetaDatasFromModelName(model)) {
      throw new ArgumentNullException('The model should have metadatas.');
    }
  }
  //Container for the validation rules of the domain of each property.
  var valDomAttrs = {};
  for (var attr in metadatas) {
    var metadata = {}, md;
    md = metadatas[attr];
    if (md.metadata !== void 0 && md.metadata !== null) {
      _.extend(metadata, md.metadata);
    }

    if (md.domain !== void 0 && md.domain !== null) {
      metadata.domain = md.domain;
    }

    if (md.required !== void 0 && md.required !== null) {
      metadata.required = md.domain;
    }
    /*Get all the validators*/
    var validators = [];

    /*If the required filed is set, add a validator.*/
    if (metadata.required) {
      validators.push({
        "type": "required",
        "value": true
      });
    }
    if (metadata.domain !== null && metadata.domain !== void 0 && domains[metadata.domain] !== null && domains[metadata.domain] !== void 0) {
      _.union(validators, domains[metadata.domain].validation);
    }
    /*Set the validators inide the */
    valDomAttrs.attr = validators;
  }
  return valDomAttrs;
};

var tryConstructModelMetaDatasFromModelName(model) {
  throw new Error('Not Implemented');
}