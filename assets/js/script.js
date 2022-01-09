var cityName = $('#inputCity');
var city = [];

//create buttons for searched cities
function createButtons() {
    $('#inputCity').val("");
    $('#logCity').empty();
    for (var i = 0; i < city.length; i++) {
        var savedCity = $("<button>")
            .addClass('btn btn-dark m-1 col-12')
            .text(city[i])
            .attr('id', 'savedBtn');
        $("#logCity").append(savedCity);
    }
};
// save searched cities to local storage
function saveCities() {
    localStorage.setItem("city", JSON.stringify(city));
};
// pull searched cities from local storage
function loadCities() {
    city = JSON.parse(localStorage.getItem("city"));
    if (!city) {
        city = [];
    } else {
        createButtons();
    }
};
// load weather data
function loadWeather(lat, lon, city) {
    var searchWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=minutely,hourly&appid=d8d8ce1212370fd38db4eec97f65b1a1';
    fetch(searchWeather).then(function (response) {
        return response.json();
    })
        .then(function (data) {
            displayCurrent(data, city);
            displayForecast(data, city);
        });
};
// display data for current day
function displayCurrent(data, city) {
    //data variables
    var date = moment().format("(MM/DD/YYYY)");
    var dataIcon = data.current.weather[0].icon;
    var temp = data.current.temp;
    var humidity = data.current.humidity;
    var wind = data.current.wind_speed + ' MPH';
    var uv = data.current.uvi;
    // display data
    $('#cityName').text(city);
    $('#cityDate').text(date).append('<img src="https://openweathermap.org/img/w/' + dataIcon + '.png" />');
    $('#cityTemp').text(temp);
    $('#cityWind').text(wind);
    $('#cityHumidity').text(humidity);
    $('#cityUv').text(uv);
    //check uv index
    if (uv > 7) {
        $('#cityUv').addClass('bg-danger');
    } else if (uv > 2) {
        $('#cityUv').addClass('bg-warning');
    } else {
        $('#cityUv').addClass('bg-success');
    }
};
// display 5 day forecast
function displayForecast(data, city)  {
    //data variables
    var fiveDay = data.daily;
    for (var i = 1; i < fiveDay.length - 2; i++)  {
        var dt = new Date(fiveDay[i].dt*1000);
        var date = dt.toLocaleDateString("en-US");
        var dataIcon = data.current.weather[0].icon;
        var temp = data.current.temp;
        var humidity = data.current.humidity;
        var wind = data.current.wind_speed + ' MPH';
    
        // create forecast elements
    // div to hold info
    var forecastDiv = $("<div>").addClass("col-12 col-md-6 col-xl-3 mb-2").append("#forecastCards");
    // card to display info
    var forecastCard = $("<div>").addClass("card");
    // element for date
    var forecastDate = $("<p>")

    }


    //   <div class="col-12 col-md-6 col-xl-3 mb-2">
//   <div class="card">
//       <h4 class="card-header bg-secondary text-light d-flex align-items-center">
//           Days
//       </h4>
//       <ul id="weatherData" class="list-group list-group-flush">
//       </ul>
//   </div>
// </div>
};
    
// load coordinates for searched/saved cities
function loadCoord(cityInput) {
    var searchCity = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&appid=d8d8ce1212370fd38db4eec97f65b1a1';
    fetch(searchCity).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var lon = data.coord.lon;
                var lat = data.coord.lat;
                loadWeather(lat, lon, cityInput);
            });
        } else {
            alert('Error: ' + response.statusText)
            city.pop();
            saveCities();
            loadCities();
        }
    });
};
// collect inputted city from form
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

$('#logCity').on('click', 'button', function (event) {
    var savedName = $(this).text().trim();
    loadCoord(savedName);
});

loadCities();
