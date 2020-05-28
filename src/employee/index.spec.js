const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../../index');
const should = chai.should();
chai.use(chaiHTTP);

describe('user',()=>{
    it('creates the user on /user/create POST',(done)=>{
        chai.request(server)
        .post('/user/create')
        .send({'name':'raj kapoor','email':'rajkapoor@gmail.com'})
        .end((e,res)=>{
            res.should.have.status(200);
            done();
        });
    });

    it('gets the user data on /user/all GET',(done)=>{
        chai.request(server)
        .get('/user/all')
        .end((e,res)=>{
            res.should.have.status(200);
            res.should.be.json;
            res.should.be.a('object');
            done();
        });
    });

    it('deletes a particular user data on /user/delete POST',(done)=>{
        chai.request(server)
        .post('/user/delete')
        .send({'id':'vlxwVnXui'})
        .end((e,res)=>{
            res.should.have.status(200)
            done();
        });
    });
});

