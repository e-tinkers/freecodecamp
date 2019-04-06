/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

describe('Functional Tests', function() {

    describe('POST /api/issues/{project} => object with issue data', function() {

      it('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);

          //fill me in too!

          done();
        });
      });

      it('Required fields filled in', function(done) {

      });

      it('Missing required fields', function(done) {

      });

    });

    describe('PUT /api/issues/{project} => text', function() {

      it('No body', function(done) {

      });

      it('One field to update', function(done) {

      });

      it('Multiple fields to update', function(done) {

      });

    });

    describe('GET /api/issues/{project} => Array of objects with issue data', function() {

      it('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });

      it('One filter', function(done) {

      });

      it('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {

      });

    });

    describe('DELETE /api/issues/{project} => text', function() {

      it('No _id', function(done) {

      });

      it('Valid _id', function(done) {

      });

    });

});
