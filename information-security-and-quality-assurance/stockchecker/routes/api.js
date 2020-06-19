/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';
var expect = require('chai').expect;
var StockHandler = require("../controllers/stockHandler.js");

module.exports = function (app, db) {
  const stockPrices = new StockHandler(db);
  let likes;

  app.route('/api/stock-prices')
    .get(async function (req, res){
      const {stock, like} = req.query;
       const ip = req.ip;

       if (Array.isArray(stock)) {
         let data = [];
         let bothLikes = [];
         for (const s of stock) {
           const price = await stockPrices.getQuote(s);
           stockPrices.getLikes(s, ip, like, function(nLikes) {
             bothLikes.push(nLikes);
             data.push({stock: s, price: price});
             if (data.length == 2) {
               data[0].rel_likes=bothLikes[0]-bothLikes[1];
               data[1].rel_likes=bothLikes[1]-bothLikes[0];
               res.json({stockData: data})
             }
           });
         }
       } else {
         const price = await stockPrices.getQuote(stock);
         stockPrices.getLikes(stock, ip, like, function(nLikes) {
           res.json({stockData: {stock: stock, price: price, likes: nLikes}});
         });
       }
    });

};
