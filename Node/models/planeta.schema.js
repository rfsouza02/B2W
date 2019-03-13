const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Planeta = new Schema({
    nome: { type: String, required: true, max: 240 },
    clima: { type: String, required: true, max: 240 },
    terreno: { type: String, required: true, max: 240 }
});

Planeta.virtual('aparicoes').get(function() {  
    return 'Funciona';
});

module.exports = mongoose.model('Planeta', Planeta);
