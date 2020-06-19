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

var likes, rel_likes;

chai.use(chaiHttp);

suite('Functional Tests', function() {

    suite('GET /api/stock-prices => stockData object', function() {

      test('1 stock', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.property(res.body.stockData, 'stock');
          assert.property(res.body.stockData, 'price');
          assert.equal(res.body.stockData.stock, 'goog');
          assert.isUndefined(res.body.stockData.like);
          done();
        });
      });

      test('1 stock with like', function(done) {
        chai.request(server)
          .get('/api/stock-prices')
          .query({stock: 'goog', like: 'true'})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body.stockData, 'stock');
            assert.property(res.body.stockData, 'price');
            assert.property(res.body.stockData, 'likes')
            assert.equal(res.body.stockData.stock, 'goog');
            assert.isAtLeast(res.body.stockData.likes, 1);
            likes = res.body.stockData.likes;  //keep the likes value for next test
            done();
          });
      });

      test('1 stock with like again (ensure likes arent double counted)', function(done) {
        chai.request(server)
          .get('/api/stock-prices')
          .query({stock: 'goog', like: true})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body.stockData, 'stock');
            assert.property(res.body.stockData, 'price');
            assert.property(res.body.stockData, 'likes')
            assert.equal(res.body.stockData.stock, 'goog');
            assert.equal(res.body.stockData.likes, likes);  //should equal to previous likes value
            done();
          });
      });

      test('2 stocks', function(done) {
        chai.request(server)
          .get('/api/stock-prices')
          .query({stock: ['msft', 'goog']})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body.stockData[0], 'stock');
            assert.property(res.body.stockData[0], 'price');
            assert.property(res.body.stockData[0], 'rel_likes');
            assert.property(res.body.stockData[1], 'stock');
            assert.property(res.body.stockData[1], 'price');
            assert.property(res.body.stockData[1], 'rel_likes');
            assert.oneOf(res.body.stockData[0].stock, ['msft', 'goog']);
            assert.oneOf(res.body.stockData[1].stock, ['msft','goog']);
            assert.equal(res.body.stockData.rel_likes, 0);
            done();
          });
      });

      test('2 stocks with like', function(done) {
        chai.request(server)
          .get('/api/stock-prices')
          .query({stock: ['msft', 'goog']})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body.stockData[0], 'stock');
            assert.property(res.body.stockData[0], 'price');
            assert.property(res.body.stockData[0], 'rel_likes');
            assert.property(res.body.stockData[1], 'stock');
            assert.property(res.body.stockData[1], 'price');
            assert.property(res.body.stockData[1], 'rel_likes');
            assert.oneOf(res.body.stockData[0].stock, ['msft', 'goog']);
            assert.oneOf(res.body.stockData[1].stock, ['msft','goog']);
            assert.equal(res.body.stockData[0].rel_likes - res.body.stockData[1].rel_likes, 0)
            done();
          });
      });

    });

});
