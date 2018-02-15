var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('nivel', function() {

    describe('GET /niveles', function() {

      it('Debería respoder un arreglo de Users', function(done) {

        request(server)
          .get('/niveles')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.eql({});

            done();
          });
      });

     

    });

  });

});
