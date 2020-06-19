var yahooFinance = require('yahoo-finance');

function StockHandler(db) {
  
  this.getQuote = async function(stock) {
   try {
      const quote = await yahooFinance.quote({
        symbol: stock,
        modules: ['price']
      });
      return quote.price.regularMarketPrice;
   }
   catch (e) {
     return null;
   }
  }

  this.getLikes = function(stock, ip, like, cb) {
    db.collection("Stocks").findOne({"stock": stock}, function(err, doc) {
      if (doc == null) {  // then create a new record
        db.collection("Stocks")
          .insertOne({
            "stock": stock,
            "likes": like=='true'? 1 : 0,
            "ip": like=='true' ? [ip] : []}
          );
        cb(like=='true'? 1 : 0);
      } else {  // stock already in database
        if (like == 'true') {
          if (doc.ip.indexOf(ip) === -1) {    // if IP is not in database yet
            db.collection("Stocks").findOneAndUpdate(
              {"stock": stock},
              {$inc: {"likes": 1}, $push: {"ip": ip}},
              {upsert: true, returnOriginal: false})
            .then(function(doc) {
                cb(doc.value.likes);
              })
          } else {  // IP already in database
            cb(doc.likes);
          }
        } else {
          cb(doc.likes);
        }
      }
    });
  }

}

module.exports = StockHandler;
