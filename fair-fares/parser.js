var parser = {

    parseYatra: function () {
        var date = new Date(user.date);
        var month = (date.getMonth() + 1);
        var day = (date.getDate());
        var year = (date.getFullYear());
        date = day + "/" + month + "/" + year;
        var url = 'https://flight.yatra.com/air-service/dom2/trigger?ADT=1&CHD=0&INF=0&class=Economy&destination=' + user.toiata + '&destinationCountry=IN&flexi=0&flight_depart_date=' + date + '&hb=0&noOfSegments=1&origin=' + user.fromiata + '&originCountry=IN&type=O&unique=1532813241488&version=1.1&viewName=normal';

        $.get(url, function (response) {
            console.log();
        });
    },

    parseIxigo: function() {
        
    }
};