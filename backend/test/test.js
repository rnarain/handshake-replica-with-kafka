var app = require('../app');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

describe('Handshake test', function(){
    it('POST /student Change Name',function(done){ 
        var data = {
            fname: "Narain",
            lname: "Ratanchandani",
            id:"5e75b9314f8754303c788ecb"
          }
        agent.post('/api/student/updateStudentName', data).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc1YjkzMTRmODc1NDMwM2M3ODhlY2IiLCJ0eXBlIjowLCJuYW1lIjoiTmFyYWluIiwicHJvZmlsZVBpY1VSTCI6Ii9VcGxvYWRzL1Byb2ZpbGUtUGljLzIzOTE3ODU2Ml9vcmlnLnBuZyIsImlhdCI6MTU4NzEyNjQ5MSwiZXhwIjoxNTg4MTM0NDkxfQ.eVZ6qpR_Y42tdi__KzDqcSaD_f3QGUhIHC9q-Kt3RLw')
            .then(function(res){
                expect(res.body.success).to.equal(1);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
    it('GET /getAllStudents -  Authorized user',function(done){
        agent.get('/api/student/getAllStudents/5e75b9314f8754303c788ecb').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc1YjkzMTRmODc1NDMwM2M3ODhlY2IiLCJ0eXBlIjowLCJuYW1lIjoiTmFyYWluIiwicHJvZmlsZVBpY1VSTCI6Ii9VcGxvYWRzL1Byb2ZpbGUtUGljLzIzOTE3ODU2Ml9vcmlnLnBuZyIsImlhdCI6MTU4NzEyNjQ5MSwiZXhwIjoxNTg4MTM0NDkxfQ.eVZ6qpR_Y42tdi__KzDqcSaD_f3QGUhIHC9q-Kt3RLw')
            .then(function(res){
                expect(res.status).to.equal(200);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
    
    it('GET /getJobsByStudentID - Get all job',function(done){
        agent.get('/api/job/getJobsByStudentID/5e75b9314f8754303c788ecb').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc1YjkzMTRmODc1NDMwM2M3ODhlY2IiLCJ0eXBlIjowLCJuYW1lIjoiTmFyYWluIiwicHJvZmlsZVBpY1VSTCI6Ii9VcGxvYWRzL1Byb2ZpbGUtUGljLzIzOTE3ODU2Ml9vcmlnLnBuZyIsImlhdCI6MTU4NzEyNjQ5MSwiZXhwIjoxNTg4MTM0NDkxfQ.eVZ6qpR_Y42tdi__KzDqcSaD_f3QGUhIHC9q-Kt3RLw')
            .then(function(res){
                expect(res.body.success).to.equal(1);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
    
    
    it('GET /studenrProfile - Get student Profile',function(done){
        agent.get('/api/student/getStudentDetails/5e75b9314f8754303c788ecb')
            .then(function(res){
                expect(res.body.success).to.equal(1);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
    it('GET /getAllStudents - Not Authorized error',function(done){
        agent.get('/api/student/getAllStudents/5e75b9314f8754303c788ecb')
            .then(function(res){
                expect(res.status).to.equal(401);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
    
    
})