var swapi = require('swapi-node');

const dal = {
    BuscaAparicoes: async function(nome) {
        var page = 1;
        var aparicoes = 0;
        var finalizou = false;

        while (true) {
            await swapi.get('https://swapi.co/api/planets/?page=' + page)
                .then((result) => {
                    result.results.forEach(element => {
                        if (element.name === nome) {
                            aparicoes = element.films.length;
                            finalizou = true;
                        }
                    });
                })
                .catch(() => {
                    finalizou = true;
                });

            page++;

            if (finalizou) {
                break;
            }
        }

        return aparicoes;
    }
}

module.exports = dal;