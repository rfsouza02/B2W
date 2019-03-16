const planeta_controller = require("../controllers/planeta.controller");
const mongoose = require('mongoose');

describe("Suite de testes para a controller de planetas.", function() {
    var req = {
        body: null
    };
    
    var res = {
        status: function(code) {
            res.statusCode = code;
        },
        send: function(body) {
            res.body = body;
        },
        json: function() {},
        set: function() {}
    };
    
    it("Não cria planeta quando requisição vier vazia e retorna status 204.", async function() {
        // Arrange
        spyOn(res, 'status');
        spyOn(res, 'json');

        // Act
        await planeta_controller.CriaPlaneta(req, res);
        
        // Assert
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalled();
    });

    it("Não cria planeta quando requisição com 'nome' nulo e retorna status 204.", async function() {
        // Arrange
        spyOn(res, 'status');
        spyOn(res, 'json');

        req.body = {
            clima: 'Quente',
            terreno: 'Arenoso'
        }

        // Act
        await planeta_controller.CriaPlaneta(req, res);
        
        // Assert
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalled();
    });

    it("Não cria planeta quando requisição com 'clima' nulo e retorna status 204.", async function() {
        // Arrange
        spyOn(res, 'status');
        spyOn(res, 'json');

        req.body = {
            nome: 'Tatooine',
            terreno: 'Arenoso'
        }

        // Act
        await planeta_controller.CriaPlaneta(req, res);
        
        // Assert
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalled();
    });

    it("Não cria planeta quando requisição com 'terreno' nulo e retorna status 204.", async function() {
        // Arrange
        spyOn(res, 'status');
        spyOn(res, 'json');

        req.body = {
            nome: 'Tatooine',
            clima: 'Quente'
        }

        // Act
        await planeta_controller.CriaPlaneta(req, res);
        
        // Assert
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalled();
    });

    it("Cria planeta com sucesso e retorna status 201.", async function() {
        // Arrange
        var planetaDal = require('../DAL/planeta.dal');

        req.body = {
            nome: 'Tatooine',
            clima: 'Quente',
            terreno: 'Arenoso'
        }

        spyOn(res, 'status');
        spyOn(res, 'json');
        spyOn(planetaDal, 'salva').and.returnValue(new Promise((res, reject) => {
            res({
                _id: 2314432,
                nome: req.body.nome,
                clima: req.body.clima,
                terreno: req.body.terreno
            });
        }));
        spyOn(planetaDal, 'buscaPlanetaPorNome').and.returnValue(new Promise((res, reject) => {
            res(null);
        }));

        // Act
        await planeta_controller.CriaPlaneta(req, res);
        
        // Assert
        expect(planetaDal.buscaPlanetaPorNome).toHaveBeenCalled();
        expect(planetaDal.salva).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalled();
    });

    it("Cria planeta com erro e retorna status 204.", async function() {
        // Arrange
        var planetaDal = require('../DAL/planeta.dal');

        req.body = {
            nome: 'Tatooine',
            clima: 'Quente',
            terreno: 'Arenoso'
        }

        spyOn(res, 'status');
        spyOn(res, 'json');
        spyOn(planetaDal, 'salva').and.returnValue(new Promise((res, reject) => {
            reject();
        }));
        spyOn(planetaDal, 'buscaPlanetaPorNome').and.returnValue(new Promise((res, reject) => {
            res(null);
        }));

        // Act
        await planeta_controller.CriaPlaneta(req, res);
        
        // Assert
        expect(planetaDal.buscaPlanetaPorNome).toHaveBeenCalled();
        expect(planetaDal.salva).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalled();
    });

    it("Cria planeta já existe e rotorna o que existe.", async function() {
        // Arrange
        var planetaDal = require('../DAL/planeta.dal');

        req.body = {
            nome: 'Tatooine',
            clima: 'Quente',
            terreno: 'Arenoso'
        }

        spyOn(res, 'status');
        spyOn(res, 'json');
        spyOn(planetaDal, 'salva').and.returnValue(new Promise((res, reject) => {
            res();
        }));
        spyOn(planetaDal, 'buscaPlanetaPorNome').and.returnValue(new Promise((res, reject) => {
            res({
                _id: 2314432,
                nome: req.body.nome,
                clima: req.body.clima,
                terreno: req.body.terreno
            });
        }));

        // Act
        await planeta_controller.CriaPlaneta(req, res);
        
        // Assert
        expect(planetaDal.buscaPlanetaPorNome).toHaveBeenCalled();
        expect(planetaDal.salva).toHaveBeenCalledTimes(0);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalled();
    });

    it("Busca de todos os planetas ocorre erro e retorna 404.", async function() {
        // Arrange
        var planetaDal = require('../DAL/planeta.dal');

        spyOn(res, 'status');
        spyOn(res, 'json');
        spyOn(planetaDal, 'buscarPlanetas').and.returnValue(new Promise((res, reject) => {
            reject();
        }));

        // Act
        await planeta_controller.BuscarPlanetas(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
    });

    it("Busca de todos os planetas com sucesso e retorna 200.", async function() {
        // Arrange
        var planetaDal = require('../DAL/planeta.dal');

        spyOn(res, 'status');
        spyOn(res, 'json');
        spyOn(planetaDal, 'buscarPlanetas').and.returnValue(new Promise((res, reject) => {
            res();
        }));

        // Act
        await planeta_controller.BuscarPlanetas(req, res);

        // Assert
        expect(res.json).toHaveBeenCalled();
    });

    it("Busca planeta por ID com sucesso e retorna 200.", async function() {
        // Arrange
        var planetaDal = require('../DAL/planeta.dal');

        req.params = { id: 123456 };

        spyOn(res, 'status');
        spyOn(res, 'json');
        spyOn(planetaDal, 'buscaPlanetaPorId').and.returnValue(new Promise((res, reject) => {
            res();
        }));

        // Act
        await planeta_controller.BuscarPlaneta(req, res);

        // Assert
        expect(res.json).toHaveBeenCalled();
    });

    it("Busca de todos os planetas ocorre erro e retorna 404.", async function() {
        // Arrange
        var planetaDal = require('../DAL/planeta.dal');

        req.params = { id: 123456 };

        spyOn(res, 'status');
        spyOn(res, 'json');
        spyOn(planetaDal, 'buscaPlanetaPorId').and.returnValue(new Promise((res, reject) => {
            reject();
        }));

        // Act
        await planeta_controller.BuscarPlaneta(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
    });
});
