/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  const unitsMap = {
    kg: 'lbs',
    lbs: 'kg',
    l: 'gal',
    gal: 'l',
    mi: 'km',
    km: 'mi'
  }
  
  const spell = {
    kg: 'kilogram',
    mi: 'mile',
    l: 'litre',
    gal: 'gallon',
    km: 'kilometre',
    lbs: 'pound'
  }
  
  // TODO: fractional
  this.getNum = function(input) {
    var num = /(^\d*(?:\.?\d+)?(?:\/\d*\.?\d+)?)\w*$/gi.exec(input.trim())
    var result;
    
    if (!num) return -1
    
    if (num[1] === '') {
      result = 1
    } else if (num[1].indexOf('/') > -1) {
      let [ numerator, denumerator ] = num[1].split('/')
      
      if (numerator.indexOf('.') > -1) numerator = parseFloat(numerator)
      else numerator = parseInt(numerator)
      
      if (denumerator.indexOf('.') > -1) denumerator = parseFloat(denumerator)
      else denumerator = parseInt(denumerator)
      
      result = numerator / denumerator
    } else result = num[1].indexOf('.') > -1 ? parseFloat(num[1]) : parseInt(num[1])
    
    return result;
  };
  
  this.getUnit = function(input) {
    var unit = /(?<=^[0-9/.]*)(gal|lbs|mi|kg|km|L)$/gi.exec(input)
    
    if (!unit) return '';
    
    return unit[0].toLowerCase();
  };
  
  this.getReturnUnit = function(initUnit) {
    var result = unitsMap[initUnit.trim().toLowerCase()]
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result = spell[unit.trim().toLowerCase()]
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    
    if (initUnit === 'gal') {
      result = initNum * galToL
    } else if (initUnit === 'l') {
      result = initNum / galToL
    } else if (initUnit === 'lbs') {
      result = initNum * lbsToKg
    } else if (initUnit === 'kg') {
      result = initNum / lbsToKg
    } else if (initUnit === 'mi') {
      result = initNum * miToKm
    } else if (initUnit === 'km') {
      result = initNum / miToKm
    }
    
    return result
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var spellInitUnit = this.spellOutUnit(initUnit)
    var spellReturnUnit = this.spellOutUnit(returnUnit)
    
    if (initNum > 1.0) spellInitUnit += 's'
    if (returnNum > 1.0) spellReturnUnit += 's'
    
    var result = `${initNum} ${spellInitUnit} converts to ${Math.round(returnNum * 100000) / 100000} ${spellReturnUnit}`
    
    return result;
  };
  
}

module.exports = ConvertHandler;
