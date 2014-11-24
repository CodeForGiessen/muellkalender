'use strict';


var parse = require('csv-parse');
var fs = require('fs');
var Q = require('q');
var readFileQ = Q.nfbind(fs.readFile);
function parseQ(input, options){
  var deferred = Q.defer();
  parse(input,options,function(error,csv){
    if(error){
      deferred.reject(new Error(error));
    }else{
      deferred.resolve(csv);
    }
  });
  return deferred.promise;
}

function correctStreet(street){
  var result = street;
  result = result.replace(/str\./g,'straße');
  result = result.replace(/Str\./g,'Straße');
  result = result.replace(/straß /g,'straße');
  result = result.replace(/Straß /g,'Straße');
  result = result.replace(/~/g,'-');
  return result;
}

function dayToNumber(day){
  switch(day){
    case 'MO': return 0;
    case 'DI': return 1;
    case 'MI': return 2;
    case 'DO': return 3;
    case 'FR': return 4;
    default: throw new Error('Not a day');
  }
}

function getDay(calender,day){
  var result = calender[day];
  if(typeof result === 'undefined'){
    return {};
  }
  return result;
}


function getAlpha(cell){
  var result = [];
  if(cell.length !== 0) {
    cell = cell.toLowerCase();
    result = cell.split(',');
  }
  return result;
}

function getNummeric(cell){
  var result = [];
  if(cell.length !== 0) {
    var spl = cell.split(',');
    result = spl.map(function(element){
      return parseInt(element.replace(/'/g,''));
    });
  }
  return result;
}



function parseDay(oldday,dayindex,rowcsv){
  var result = oldday;

  var day = {
    residual_waste_eco: getAlpha(rowcsv[1]),
    residual_waste: getNummeric(rowcsv[2]),
    paper_waste: getNummeric(rowcsv[3]),
    plastic_waste: getNummeric(rowcsv[4]),
    bio_waste: getNummeric(rowcsv[5]),
    bulk_waste: getNummeric(rowcsv[6])
  };

  result[dayindex] = day;
  return result;
}

function Converter(csvs){
  this.streets = csvs.streets;
  this.monday = csvs.monday;
  this.tuesday = csvs.tuesday;
}

/**
 * [getStreetsJSON description]
 * @return {Qpromise} [description]
 */
 Converter.prototype.getStreetsJSON = function(){
  return readFileQ(this.streets)
  .then(parseQ)
  .then(function(csv){
    var result = [];
    csv.forEach(function(row){
      var element = {
        name: correctStreet(row[0]),
        day: dayToNumber(row[7]),
        residual_waste_eco: row[1].toLowerCase(),
        residual_waste: parseInt(row[2]),
        paper_waste: parseInt(row[3]),
        plastic_waste: parseInt(row[4]),
        bio_waste: parseInt(row[5]),
        bulk_waste: parseInt(row[6])
      };
      result.push(element);
    });
    return result;
  });
};

Converter.prototype.getCalenderJSON = function(){
  return Q.resolve([this.monday, this.tuesday])
  .then(function(days){
    return days.map(function(day){
      return readFileQ(day)
      .then(parseQ);
    });
  })
  .all()
  .then(function(csvs){
    var calender = {};

    for(var i in csvs){
      var csv = csvs[i];
      csv = csv.slice(1);

      for(var j in csv){
        var row = csv[j];
        var day = getDay(calender,row[0]);
        day = parseDay(day,i,row);
        calender[row[0]] = day;
      }
    }

    return calender;
  });
};


module.exports = Converter;