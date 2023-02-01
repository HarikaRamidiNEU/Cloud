import chai from "chai"
import chaiHTTP  from "chai-http";
import app from "../src/app.js"

chai.use(chaiHTTP);
chai.config.includeStack = true;

var should = chai.should(),
assert = chai.assert,
expect = chai.expect;

describe('Our server', function() {
  
    it('should return status 200 on healthz GET', function(done){
        chai.request(app)
        .get('/healthz')
        .end(function(err, res){
          res.should.have.status(200);
          done();
        })
      });

      it('should return status 200 on login', function(done){
        chai.request(app)
        .get('/healthz')
        .end(function(err, res){
          res.should.have.status(200);
          done();
        })
      });
  });