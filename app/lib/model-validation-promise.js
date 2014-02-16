/*global Promise, _*/
exports.validate = function(model) {
  var errors = {};
  //Looping through each attributes.
  for (var attr in model.attributes) {
    if (!model.isValid(attr)) {
      errors[attr] = attr + "not valid "; // Todo: translate the message.
    }
  }
  //Promisify the validations , if there is errors call the reject else call resolve with the model.
  return new Promise(function promiseValidation(resolve, reject) {
    if (_.isEmpty(errors)) {
      console.log('resolve');
      resolve(model);
    } else {
      console.log('reject');
      reject(errors);
    }
    return undefined;
  });
};