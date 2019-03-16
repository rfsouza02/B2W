const planeta_schema = require('../models/planeta.schema');

const dal = {
    buscarPlanetas: function() {
        return new Promise((resolve, reject) => { 
            planeta_schema.find(function(err, docs) {
                if (err) {
                    reject(err)
                } else {
                    resolve(docs);
                }
            });
        });
    },
    buscaPlanetaPorId: function(id) {
        return new Promise((resolve, reject) => {
            planeta_schema.findById(id, function(err, doc) {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc);
                }
            });
        });
    },
    buscaPlanetaPorNome: function(_nome) {
        return new Promise((resolve, reject) => {
            planeta_schema.findOne({nome: _nome}, function(err, doc) {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc);
                }
            });
        });
    },
    salva: function(planeta) {
        return new Promise((resolve, reject) => {
            let planetaSchema = new planeta_schema(planeta);
        
            planetaSchema.save(function(err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        });
    }
}

module.exports = dal;
