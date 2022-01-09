var cityName = $('#inputCity');

var city = [];

function createButtons() {
    $('#inputCity').val("");
    $('#logCity').empty();
    for (var i = 0; i < city.length; i++) {
        var savedCity = $("<button>")
            .addClass("btn btn-primary m-1 col-12")
            .text(city[i])
            .attr('id', 'savedBtn');
        $("#logCity").append(savedCity);
    }
};

function saveCities() {
    localStorage.setItem("city", JSON.stringify(city));
};

function loadCities() {
    city = JSON.parse(localStorage.getItem("city"));
    if (!city)  {
        city = [];
    } else {
    createButtons();
    }
};

function loadWeather(lat, lon)  {
    var searchWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude={part}&appid=d8d8ce1212370fd38db4eec97f65b1a1';
    console.log(searchWeather);
};

function loadCoord(city)  {
    var searchCity = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=d8d8ce1212370fd38db4eec97f65b1a1';
    fetch(searchCity).then(function (response) {
        if(response.ok)  {
            response.json().then(function (data)  {
                var lon = data.coord.lon;
                var lat = data.coord.lat;
                loadWeather(lat, lon);
            });
        } else  {
            alert('Error: ' + response.statusText)
        }
    });
};

$('#inputForm').on('submit', function (event) {
    event.preventDefault();
    if (cityName.val()) {
        var cityInput = cityName.val();
        city.push(cityInput);
        saveCities();
        createButtons();
        loadCoord(cityInput);
    } else {
        alert("You must enter a valid city!");
    }
});

$('#logCity').on('click', 'button', function(event)  {
    var savedName = $(this).text().trim();
    loadCoord(savedName);
});

loadCities();
//loadCoord();
