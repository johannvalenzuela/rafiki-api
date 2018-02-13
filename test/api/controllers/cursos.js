var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function () {
    describe('cursos', function () {
        describe('GET /cursos', function () {
            it('Debería respoder un arreglo de Users', function (done) {
                request(server)
                    .get('/cursos')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        should.not.exist(err);

                        res.body.should.eql('Hello, stranger!');

                        done();
                    });
            });

            it('Debería respoder un formulario', function (done) {
                request(server)
                    .post('/cursos')
                    .send({nivel: "4"})
                    .set('Accept', 'application/json')
                    .expect(302)
                    .expect('Location',done)
            });
        });

    });

});