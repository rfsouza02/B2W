B2W

Objetivo
========

Aplicação em NodeJS para atender aos requisitos do Desafio. Feito com testes unitários mockando a camada de acesso a base.
Toda a especificação foi seguida, no caso para ter o número de aparições de um planeta em filmes rodar a chamda que trás apenas um único planeta por Id.


Comandos
========

- Adicionar um planeta (com nome, clima e terreno)
Ex.: POST http://localhost:3000/planetas/ 

enviando na requisição o corpo em JSON: 
{
	"nome": "Tatooine",
	"clima": "Quente",
	"terreno": "Arenoso"
}

Retorno HTTP:

Sucesso: 201
Falha: 204

- Listar planetas

Ex.: GET http://localhost:3000/planetas/ 

Retorno HTTP:

Sucesso: 200
Falha: 404

- Buscar por nome

Ex.: GET http://localhost:3000/planetas/?nome=Tatooine 

Retorno HTTP:

Sucesso: 200
Falha: 404

- Buscar por ID

Ex.: GET http://localhost:3000/planetas/54565651854

Retorno HTTP:

Sucesso: 200
Falha: 404

- Remover planeta

Ex.: DELETE http://localhost:3000/planetas/54565651854

Retorno HTTP:

Sucesso: 204
Falha: 404


Instruções para execução
=========================

1 - Clonar o Projeto.
2 - Rodar o 'npm i' na pasta raiz.
3 - Rodar o comando 'node index.js' na pasta raiz.


Testes
======

1 - Apenas rodar o comando npm test na pasta raiz.


