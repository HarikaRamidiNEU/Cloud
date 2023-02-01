import chai from "chai"
import chaiHTTP  from "chai-http";
import app from "../src/app.js"
import users from "./seedData.js"
 import supertest from "supertest";

chai.use(chaiHTTP);
chai.config.includeStack = true;

var should = chai.should(),
assert = chai.assert,
expect = chai.expect;

const request = supertest(app);

describe('server check with healthz', function() {
  
    it('should return status 200 on healthz GET', function(done){
        chai.request(app)
        .get('/healthz')
        .end(function(err, res){
          res.should.have.status(200);
          done();
        })
      });
  });

  describe('Unauthenticated apis', function(){
    it('should return status 200 on login', function(done){
      request
      .post('/v1/login')
      .send({"username": users.email,
      "password": users.password})
      .expect(200)
      .expect((res) => {
        expect(res.body.token).toBe(users.token);
      })
      .end(function(err, res){
        res.should.have.status(200);
        done();
      })
    });

    it('should return status 401 unauthorized without password', function(done){
      request
      .post('/v1/login')
      .send({"username": users.email,
      "password": ""})
      .expect(401)
      .end(function(err, res){
        res.should.have.status(401);
        done();
      })
    });

    it('should not create user with invaild data', (done) => {
      request
        .post('/v1/user')
        .send({})
        .expect(400)
        .end((err, res) => {
          if(err) return done(err);
          res.should.have.status(400);
          done();
        })
    });
  })

  describe('Authenticated apis', function() {
  
      it('should return status 200 and user data', function(done){
        request
        .get('/v1/user/5')
        .set('authorization', users.token)
        .expect(200)
        .expect((res) => {
          expect(res.body.username).toBe(users.email);
        })
        .end(done())
      });

      it('should return status 403 when requesting others data', function(done){
        request
        .get('/v1/user/1')
        .set('authorization', users.token)
        .expect(403)
        .end(done())
      });

      it('should return status 401 when requesting without token', function(done){
        request
        .get('/v1/user/5')
        .set('authorization', '')
        .expect(401)
        .end(done())
      });

      it('should return status 204 when updating user data', function(done){
        request
        .put('/v1/user/5')
        .set('authorization', users.token)
        .send({"first_name": "Person_first"})
        .expect(204)
        .end(done())
      });

      it('should return status 403 when updating others data', function(done){
        request
        .put('/v1/user/1')
        .set('authorization', users.token)
        .send({"first_name": "Person_first"})
        .expect(403)
        .end(done())
      });

      it('should return status 401 when updating without token', function(done){
        request
        .put('/v1/user/5')
        .set('authorization', '')
        .send({"first_name": "Person_first"})
        .expect(401)
        .end(done())
      });

      it('should return status 400 when updating restricted fields', function(done){
        request
        .put('/v1/user/5')
        .set('authorization', users.token)
        .send({"account_created": "4567"})
        .expect(400)
        .end(done())
      });

  });