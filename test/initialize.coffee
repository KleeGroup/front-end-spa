require('./initialize-globals').load({log: true});
tests = [
  './models/model',
  './lib/model-validation-promise'
]

for test in tests
  require test
