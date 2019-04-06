/*
*
*
*       Complete the handler logic below
*
*
*/

function ConvertHandler() {

  this.getNum = function(input) {
    let str = input;
    // if it doesn't consists of a fraction, parse and return floating number
    if (str.search(/[\/\-]/) == -1 ) {
      const result = parseFloat(str, 10);
      if (result >= 0) {
        return result;
      } else {
        return 1    // no number provided, default to 1
      }
    }

    let wholeNum = 0;
    let frac;
    let deci;

    // in the form of '1-3/4'
    if(str.search('-') >= 0){
      wholeNum = str.split('-');
      frac = wholeNum[1].split('/');
      wholeNum = parseInt(wholeNum, 10);
      deci = parseFloat(frac[0]) / parseFloat(frac[1]);
      return wholeNum + deci;
    }
    else if (str.search('/') >= 0) {
      frac =  str.split('/');
      if (frac.length > 2) {
        return NaN;    // invalide double '//'
      }
      deci = parseFloat(frac[0], 10) / parseFloat(frac[1], 10);
      return wholeNum + deci;
    }
    return NaN;
  };

  this.getUnit = function(input) {
    const unit = input.split(/[0-9]+/g).pop().toLowerCase(); // split on number, get the last one
    const regex = /^(gal|kg|mi|km|lbs|l)$/g;
    const result = unit.match(regex);
    if (result == null) {
      return null;
    }
    return result[0];
  };

  this.getReturnUnit = function(initUnit) {
    const imperials = ['gal','lbs','mi'];
    const metrics = ['l','kg','km'];
    const isImperial = imperials.indexOf(initUnit);
    const isMetric = metrics.indexOf(initUnit);
    if (isImperial != -1) {
      return metrics[isImperial];
    } else if (isMetric != -1) {
      return imperials[isMetric];
    } else {
      return
    }
  };

  this.spellOutUnit = function(unit) {
    const allUnits = {
      'gal': 'gallons',
      'l': 'liters',
      'kg': 'kilograms',
      'lbs': 'pounds',
      'mi': 'miles',
      'km': 'kilometers'
    };
    return allUnits[unit];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    var returnUnit = this.getReturnUnit(initUnit);
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        result = undefined;
        break;
    }
    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initN = Math.floor(initNum * 100000) / 100000;
    const returnN = Math.floor(returnNum * 100000) / 100000;
    const initSpellOut = this.spellOutUnit(initUnit);
    const returnSpellOut = this.spellOutUnit(returnUnit);
    return `${initN} ${initSpellOut} converts to ${returnN} ${returnSpellOut}`;
  };

}

module.exports = ConvertHandler;
