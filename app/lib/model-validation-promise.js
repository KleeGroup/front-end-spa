/*global Promise, _*/
exports.validate = function(model) {
  var errors = {};
  //Looping through each attributes.
  for (var attr in getValidatedAttrs(model)) {
    //console.log("Attr", attr);
    if (!model.isValid(attr)) {
      errors[attr] = attr + " not valid."; // Todo: translate the message.
    }
  }
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

var getValidatedAttrs = function(model) {
  return _.reduce(_.keys(_.result(model, 'validation') || {}), function(memo, key) {
    memo[key] = void 0;
    return memo;
  }, {});
};