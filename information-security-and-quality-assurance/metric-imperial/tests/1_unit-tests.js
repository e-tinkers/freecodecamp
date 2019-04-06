/*
*
*
*       FILL IN EACH UNIT it BELOW COMPLETELY
*       -----[Keep the its in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;

var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

describe('Unit its', function(){

  describe('Function convertHandler.getNum(input)', function() {

    it('Whole number input', function(done) {
      const input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });

    it('Decimal Input', function(done) {
      const input = '3.2L';
      assert.equal(convertHandler.getNum(input),3.2);
      done();
    });

    it('Fractional Input', function(done) {
      const input = '2/4L';
      assert.equal(convertHandler.getNum(input),0.5);
      done();
    });

    it('Fractional Input w/ Decimal', function(done) {
      const input = '2/12.5L';
      assert.equal(convertHandler.getNum(input), 0.16);
      done();
    });

    it('Invalid Input (double fraction)', function(done) {
      const input = '2/7.2/4L';
      const result = convertHandler.getNum(input);
      assert.isNaN(result);
      done();
    });

    it('No Numerical Input', function(done) {
      const input = 'L';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });

  });

  describe('Function convertHandler.getUnit(input)', function() {

    it('For Each Valid Unit Inputs', function(done) {
      const input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        const data = "1/2.0" + ele;
        assert.equal(convertHandler.getUnit(data),ele.toLowerCase());
      });
      done();
    });

    it('Unknown Unit Input', function(done) {
      let result = convertHandler.getUnit('1/2.0');
      assert.isNull(result);
      done();
    });

  });

  describe('Function convertHandler.getReturnUnit(initUnit)', function() {

    it('For Each Valid Unit Inputs', function(done) {
      const input = ['gal','l','mi','km','lbs','kg'];
      const expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });

  });

  describe('Function convertHandler.spellOutUnit(unit)', function() {

    it('For Each Valid Unit Inputs', function(done) {
      const input = ['gal','l','kg','lbs','mi','km'];
      const expected = {
        'gal': 'gallons',
        'l': 'liters',
        'kg': 'kilograms',
        'lbs': 'pounds',
        'mi': 'miles',
        'km': 'kilometers'
      };
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expected[ele]);
      })
      done();
    });

  });

  describe('Function convertHandler.convert(num, unit)', function() {

    it('Gal to L', function(done) {
      const input = [5, 'gal'];
      const expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });

    it('L to Gal', function(done) {
      const input = [5, 'l'];
      const expected = 1.320864;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    it('Mi to Km', function(done) {
      const input = [1, 'mi'];
      const expected = 1.60934;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    it('Km to Mi', function(done) {
      const input = [1, 'km'];
      const expected = 0.6213712;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    it('Lbs to Kg', function(done) {
      const input = [1, 'lbs'];
      const expected = 0.453592;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    it('Kg to Lbs', function(done) {
      const input = [1, 'kg'];
      const expected = 2.204623;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

  });

});
