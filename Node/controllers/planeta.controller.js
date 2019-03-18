var Planeta = require('../DAL/planeta.dal');
var swapi = require('../DAL/swapi.dal');

const controller = {
    BuscarPlanetaPorNome: async function(req, res) {
        Planeta.buscaPlanetaPorId(req.query.nome)
            .then(doc => {
                res.json(doc);
            })
            .catch(() => {
                res.status(404);
                res.json();
            });
    },
    DeletarPlaneta: async function(req, res) {
        res.set({
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Location': '/planetas/'
        });
        
        Planeta.deletarPlaneta(req.params.id)
            .then(() => {
                res.status(204);
                res.json();
            })
            .catch(() => {
                res.status(404);
                res.json();
            })
    },
    BuscarPlaneta: async function(req, res) {
        Planeta.buscaPlanetaPorId(req.params.id)
            .then(doc => {
                swapi.BuscaAparicoes(doc.nome).then(value => {
                    res.json({
                        _id: doc._id,
                        nome: doc.nome,
                        clima: doc.clima,
                        terreno: doc.terreno,
                        aparicoes: value
                    });
                });
            })
            .catch(() => {
                res.status(404);
                res.json();
            });
    },
    BuscarPlanetas: async function(req, res) {
        Planeta.buscarPlanetas(req.query)
            .then(docs => {
                res.json(docs);
            })
            .catch(() => {
                res.status(404);
                res.json();
            });
    },
    CriaPlaneta: async function(req, res) {
        if (req == null || req.body == null || 
            req.body.nome == null || req.body.clima == null || req.body.terreno == null) 
        {
            res.status(204);
            return res.json();
        }

        res.set({
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Location': '/planetas/'
        });

        let planeta = null;

        await Planeta.buscaPlanetaPorNome(req.body.nome)
            .then((doc) => {
                if (doc != null) {
                    planeta = doc;
                }
            })
            .catch(() => {
                planeta = null;
            });

        if (planeta != null) {
            res.status(201);
            res.json(planeta);
            return;
        }

        Planeta.salva({
            nome: req.body.nome,
            clima: req.body.clima,
            terreno: req.body.terreno
        }).then((doc) => {
            res.status(201);
            res.json({
                _id: doc._id,
                nome: doc.nome,
                clima: doc.clima,
                terreno: doc.terreno
            });
        }).catch(() => {
            res.status(204);
            res.json({});
        });
    }
}

module.exports = controller;
