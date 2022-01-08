cityName = $('#inputCity');

var city = "";

function buttonHandler(value)    {
    event.preventDefault();
    $('#inputCity').val("");
    var savedCity = $("<button>")
    .addClass("btn btn-primary m-1 col-12")
    .text(value);
    $("#logCity").append(savedCity);
    localStorage.setItem();
    storeCity(value);
};


$('#submitSearch').on("click", function()  {
    var cityInput = cityName.val();
    buttonHandler(cityInput);
    storedCity = {
        city: cityInput
    };
});

function storeCity(data)  {
    localStorage.setItem(city);
};