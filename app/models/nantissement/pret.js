var URL = require('../URL');
var domDef = require('../../lib/domains-definition');
var Model = require('../model');
//define a model for pret
module.exports = Model.extend({
  //Initilize the defaults criteria.
  defaults: {
    olsId: undefined,
    cilId: undefined,
    isTopListeRouge: false,
    isTopConvention: false,
    isNanti: false,

  },
  modelName: "nantissement.pret",
  //Each domain key much match a model property when given to the template.
  metadatas: {
    isTopListeRouge:domDef.nantissement.pret.isTopListeRouge,
    isTopConvention: domDef.nantissement.pret.isTopConvention,
    isNanti: domDef.nantissement.pret.isNanti,
    identificationUESLPret: domDef.nantissement.pret.identificationUESLPret,
    identificationCILPret: domDef.nantissement.pret.identificationCILPret,
    montantNominalMin: domDef.nantissement.pret.montantNominalMin,
    montantNominalMax: domDef.nantissement.pret.montantNominalMax,
    dateContratMin: domDef.nantissement.pret.dateContratMin,
    dateContratMax: domDef.nantissement.pret.dateContratMax,
    dateDerniereEcheanceMin: domDef.nantissement.pret.dateDerniereEcheanceMin,
    dateDerniereEcheanceMax: domDef.nantissement.pret.dateDerniereEcheanceMax
  },
  validation: {
    //To be defined.
  },
  urlRoot: URL.nantissement.pret,
  initialize: function initializePret() {}
});