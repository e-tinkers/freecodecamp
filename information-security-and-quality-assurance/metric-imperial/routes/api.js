/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      const input = escape(req.query.input);

      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      let toString;
      if (initNum == null) {
        toString = "invalid number";
      }
      else if (initUnit == null) {
        toString = "invalid unit";
      } else if (initNum == null && initUnit == null) {
        toString = "invalid num and unit"
      } else {
        toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      }
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
          'initNum': initNum,
          'initUnit': initUnit,
          'returnNum': returnNum,
          'returnUnit': returnUnit,
          'string': toString
        }));

    });

};
