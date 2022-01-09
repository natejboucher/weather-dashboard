var cityName = $('#inputCity');
var city = [];

// create buttons for searched cities
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
    $('#currentContainer').removeClass('hidden');
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
    $('#cityUv').removeClass('bg-success bg-warning bg-danger');
    if (uv < 2 || uv === 0 ) {
        $('#cityUv').addClass('bg-success bg-gradient p-1 rounded');
    } else if (uv < 7) {
        $('#cityUv').addClass('bg-warning bg-gradient p-1 rounded');
    } else {
        $('#cityUv').addClass('bg-danger bg-gradient p-1 rounded');
    }
};
// display 5 day forecast
function displayForecast(data) {
    $('#forecastCards').empty();
    //data variables
    var fiveDay = data.daily;
    //loop to create elements
    for (var i = 1; i < fiveDay.length - 2; i++) {
        // data variables
        var dt = new Date(fiveDay[i].dt * 1000);
        var date = dt.toLocaleDateString("en-US");
        var dataIcon = data.daily[i].weather[0].icon;
        var temp = data.daily[i].temp.max;
        var humidity = data.daily[i].humidity;
        var wind = data.daily[i].wind_speed + ' MPH';

        // create forecast elements
        // div to hold info
        var forecastDiv = $('<div>').addClass('col-12 col-md-6 col-xl-3 mb-2');
        // card to display info
        var forecastCard = $('<div>').addClass('card bg-secondary p-2');
        // element for date
        var forecastDate = $('<h3>').addClass('text-white p-1').text(date).append(forecastCard);
        // element for icon
        var forecastIcon = $('<img src="https://openweathermap.org/img/w/' + dataIcon + '.png" />');
        // ul for weather data
        var forecastUl = $('<ul>').addClass('list-group');
        // li for temp
        var forecastTemp = $('<li>').addClass('list-group-item p-1 bg-secondary text-white').text('Temp: ' + temp);
        // li for wind
        var forecastWind = $('<li>').addClass('list-group-item p-1 bg-secondary text-white').text('Wind: ' + wind);
        // li for humidity
        var forecastHumidity = $('<li>').addClass('list-group-item p-1 bg-secondary text-white').text('Humidity: ' + humidity);
        $('#forecastCards').append(forecastDiv);
        forecastDiv.append(forecastCard);
        forecastCard.append(forecastDate);
        forecastDate.append(forecastIcon);
        forecastDiv.append(forecastUl);
        forecastUl.append(forecastTemp, forecastWind, forecastHumidity);
    }
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
// listener for saved searches
$('#logCity').on('click', 'button', function (event) {
    var savedName = $(this).text().trim();
    loadCoord(savedName);
});
loadCities();
