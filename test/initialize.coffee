require('./initialize-globals').load({log: true});
tests = [
  './models/model'
]

for test in tests
  require test
