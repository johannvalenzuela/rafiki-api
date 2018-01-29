var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function () {
    describe('asignatura', function () {
        describe('GET /hello', function () {
            it('Debería respoder un arreglo de Users', function (done) {
                request(server)
                    .get('/hello')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        should.not.exist(err);

                        res.body.should.eql('Hello, stranger!');

                        done();
                    });
            });
        });

    });

});