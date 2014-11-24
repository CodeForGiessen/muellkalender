'use strict';

angular.module('Muellkalender.services')
.factory('collections',  ['calender','$filter',function (calender,$filter) {

    var getFormattedDay = function(daysfromToday){
        var today = new Date();
        today.setDate(today.getDate()+daysfromToday);
        return $filter('date')(today,'dd.MM.yyyy');
    };

    var getDateFromCalender = function(calender,date){
        return calender[date];
    };

    var getNextCollectionForWaste = function(calender,day,waste,wastenr){
        var result;

        var daysFromToday = 0;
        var today = getFormattedDay(daysFromToday);
        var date;
        while((date = getDateFromCalender(calender,today))){
            var myDay = date[day.toString()];
            var myWaste = myDay[waste];
            if(myWaste.indexOf(wastenr) > -1){
                return today;
            }
            daysFromToday++;
            today = getFormattedDay(daysFromToday);
        }

        return result;
    };

    var getNextCollections = function(day, wasteSearch) {
        // wasteSearch = {
        //     'residual_waste_eco': 'a',
        //     'residual_waste': 2,
        //     'paper_waste': 1,
        //     'plastic_waste': 1,
        //     'bio_waste': 1,
        //     'bulk_waste': 1
        // };

        return calender.getCalender()
        .then(function(calender){
            var wastes =  [
            'residual_waste_eco',
            'residual_waste',
            'paper_waste',
            'plastic_waste',
            'bio_waste',
            'bulk_waste'];

            var result = {};
            for (var i = 0; i<wastes.length;i++){
                var waste = wastes[i];
                result[waste] = getNextCollectionForWaste(calender,day,waste,wasteSearch[waste]);
            }
            return result;
        });
    };
    return {
        getNextCollections: getNextCollections
    };
}]);
