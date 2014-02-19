/*global Promise, _*/
//Get the domains definition.
var domains = require('./domains');
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

var validateCustomAttributes = function validateCustomAttributes(model, errors){
  if(!model){throw new Error('The model should have a metadatas property.');}
  for (var attr in getValidatedAttrs(model)) {
    //console.log("Attr", attr);
    if (!model.isValid(attr)) {
      errors[attr] = attr + " not valid."; // Todo: translate the message.
    }
  }
};


var getValidatedAttrs = function(model) {
  return _.reduce(_.keys(_.result(model, 'validation') || {}), function(memo, key) {
    memo[key] = void 0;
    return memo;
  }, {});
};
//Get the validation attributes from the domain.
var getDomainsAttrs = function getDomainsAttrs(model){
  if(!model){return new Error('The model should have a metadatas property.');}

  //Get the metadatas from the model.
  var metadatas = model.metadatas;
  if(metadatas){

  }
};