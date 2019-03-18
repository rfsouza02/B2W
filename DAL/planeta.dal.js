const planeta_schema = require('../models/planeta.schema');

const dal = {
    deletarPlaneta: function(id) {
        return new Promise((resolve, reject) => { 
            planeta_schema.findByIdAndRemove(id, function(err, doc) {
                if (err) {
                    reject(err)
                } else {
                    
                    if (doc == null) {
                        reject();
                    }
                    resolve(doc);
                }
            });
        });
    },
    buscarPlanetas: function(query) {
        return new Promise((resolve, reject) => { 
            if (query != null) {
                planeta_schema.find(query, function(err, docs) {
                    if (err) {
                        reject(err)
                    } else {
                        if (docs.length === 0) {
                            reject();
                        }
                        resolve(docs);
                    }
                });
            } else {
                planeta_schema.find(function(err, docs) {
                    if (err) {
                        reject(err)
                    } else {
                        if (docs.length === 0) {
                            reject();
                        }
                        resolve(docs);
                    }
                });
            }
        });
    },
    buscaPlanetaPorId: function(id) {
        return new Promise((resolve, reject) => {
            planeta_schema.findById(id, function(err, doc) {
                if (err) {
                    reject(err)
                } else {
                    if (doc == null) {
                        reject();
                    }
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
                    if (doc == null) {
                        reject();
                    }
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
                    if (doc == null) {
                        reject();
                    }
                    resolve(doc);
                }
            });
        });
    }
}

module.exports = dal;
