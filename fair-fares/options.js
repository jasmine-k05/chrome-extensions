$('#datepicker').datepicker({
    uiLibrary: 'bootstrap4'
});

$('#timepicker').timepicker();

// typeahead for location
var substringMatcher = function (strs) {
    return function findMatches(q, cb) {
        var matches, substringRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function (i, str) {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
        });

        cb(matches);
    };
};

var airports = ["Ahmedabad", "Akola", "Aurangabad", "Mumbai", "Bilaspur", "Bhuj", "Belgaum", "Vadodara", "Bhopal", "Bhavnagar", "Vasco da Gama", "Hubli", "Indore", "Jamnagar", "Kandla", "Khajuraho", "Nanded", "Naqpur", "Nasik", "Pune", "Porbandar", "Rajkot", "Shirdi", "Solapur", "Udaipur", "Agartala", "Siliguri", "Shillong", "Bhubaneswar", "Kolkata", "Durgapur", "Gorakhpur", "Guwahati", "Imphal", "Jamshedpur", "Jorhat", "Silchar", "Aizawl", "Lilabari", "Dibrugarh", "Dimapur", "Patna", "Ranchi", "Ziro", "Allahabad", "Amritsar", "Bikaner", "Varanasi", "Bareilly", "Chandigarh", "Kanpur", "Dehradun", "New Delhi", "Gwalior", "Jodhpur", "Jaipur", "Jammu", "Ajmer", "Kota", "Leh", "Lucknow", "Pathankot", "Pantnagar", "Srinagar", "Latur", "Bellary", "Bangalore", "Coimbatore", "Kochi", "Calicut", "Kadapa", "Hyderabad", "Madurai", "Mangalore", "Chennai", "Port Blair", "Pondicherry", "Puttaparthi", "Rajahmundry", "Rewa", "Salem", "Tiruchirappally", "Thiruvananthapuram"];

$('.typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
}, {
        name: 'airports',
        source: substringMatcher(airports)
    });

// user data capture begins
var user, data;

// submit input data
$('.submit').click(function () {
    user = {
        from: $('.from.tt-input').val(),
        to: $('.to.tt-input').val(),
        date: $('.date').val(),
        interval: $('.interval .active input').attr('id'),
    };

    // getting airport iata for parsing later
    $.getJSON('./data.json', callback);

    function callback(data) {
        function getJsonValue(key, matchKey, match) {
            var temp;
            $.each(data, function (i, v) {
                if (v[matchKey] == match) {
                    temp = v[key];
                }
            });
            return temp;
        }

        user.fromiata = getJsonValue('iata', 'city', user.from);
        user.toiata = getJsonValue('iata', 'city', user.to);

        // storing in sync storage
        chrome.storage.sync.set(user, function () {
            console.log('user data saved', user);
        });

        parser.parseIxigo();
    }
});

// clear input form
$('.clear').click(function () {
    clearInput($('.form-control'));
})

function clearInput(list) {
    $.each(list, function () {
        $(this).val("");
    });
}