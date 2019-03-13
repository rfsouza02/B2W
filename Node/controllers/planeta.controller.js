const planeta_schema = require('../schemas/planeta.schema');

exports.CriaPlaneta = function (planeta) {
    let planetaSchema = new planeta_schema({
        nome: planeta.nome,
        clima: planeta.clima,
        terreno: planeta.terreno
    });

    planetaSchema.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};
