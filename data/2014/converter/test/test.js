'use strict';

var CsvConverter = require('../lib/converter.js');
var P = require('path');
var Q = require('q');
var fs = require('fs');


var csvs = {
  streets: P.resolve('streets.csv'),
  monday: P.resolve('monday.csv'),
  tuesday: P.resolve('tuesday.csv')
};

var converter = new CsvConverter(csvs);

converter.getStreetsJSON()
.then(function(data){
  fs.writeFile('streets.json',JSON.stringify(data,null,4));
  fs.writeFile('streets.min.json',JSON.stringify(data));
})
.catch(function(error){
  console.error(error);
});

converter.getCalenderJSON()
.then(function(data){
  fs.writeFile('calender.json',JSON.stringify(data,null,4));
  fs.writeFile('calender.min.json',JSON.stringify(data));
})
.catch(function(error){
  console.error(error);
});

