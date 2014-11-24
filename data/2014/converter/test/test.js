'use strict';

var CsvConverter = require('../lib/converter.js');
var P = require('path');
var Q = require('q');
var fs = require('fs');


var csvs = {
  streets: P.resolve(__dirname,'streets.csv'),
  monday: P.resolve(__dirname,'monday.csv'),
  tuesday: P.resolve(__dirname,'tuesday.csv')
};

var converter = new CsvConverter(csvs);

converter.getStreetsJSON()
.then(function(data){
  fs.writeFile(P.resolve(__dirname,'streets.json'),JSON.stringify(data,null,4));
  fs.writeFile(P.resolve(__dirname,'streets.min.json'),JSON.stringify(data));
})
.catch(function(error){
  console.error(error);
});

converter.getCalenderJSON()
.then(function(data){
  fs.writeFile(P.resolve(__dirname,'calender.json'),JSON.stringify(data,null,4));
  fs.writeFile(P.resolve(__dirname,'calender.min.json'),JSON.stringify(data));
})
.catch(function(error){
  console.error(error);
});

