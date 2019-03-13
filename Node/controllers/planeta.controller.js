const planeta_schema = require('../models/planeta.schema');

exports.CriaPlaneta = function (req, res) {
    let planetaSchema = new planeta_schema({
        nome: req.body.nome,
        clima: req.body.clima,
        terreno: req.body.terreno
    });

    planetaSchema.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};
