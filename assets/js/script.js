cityName = $('#inputCity');

var city = [];

function createButtons() {
    $('#inputCity').val("");
    $('#logCity').empty();
    for (var i = 0; i < city.length; i++) {
        var savedCity = $("<button>")
            .addClass("btn btn-primary m-1 col-12")
            .text(city[i]);
        $("#logCity").append(savedCity);
    }
};


$('#inputForm').on("submit", function (event) {
    event.preventDefault();
    if (cityName.val()) {
        var cityInput = cityName.val();
        city.push(cityInput);
        saveCities();
        createButtons();
    } else {
        alert("You must enter a valid city!");
    }
});

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

function loadCityCoord()  {
    
}

loadCities();
