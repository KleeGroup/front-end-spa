# The config object
class Config
  appcontainer: 'content'
  approot: '/'
  apiroot: 'http://localhost:8080/'
  lang: "fr-FR"
  dateFormat: "JJ/MM/AAAA HH:mm"
  appName: 'vms'
  log: {level: 'error', max: 100, outputs:['console', 'localStorage']}

module.exports = new Config()