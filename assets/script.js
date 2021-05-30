//Global variable declarations
var cityList =[];
var cityName;

//local storage functions
initCityList ();
initWeather ();

//function to display the city entered by the user into the DOM
function renderCities(){
    $("#cityList").empty();
    $("#cityInput").val("");

    for (i=0; i<cityList.length, i++){
        var a = $("<a>");
        a.addClass("list-group-item list-group-item-action list-group-item-primary city");
        a.attr("data-name", cityList[i]);
        a.text(cityList[i]);
        $("#cityList").prepend(a);
    }
}

//function to get the city list array from local
function initCityList() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));

    if (storedCities !== null) {
        cityList = storedCities;
    }

    renderCities();
}

//function to get current city into local to display current weather when refreshed
function initWeather() {
    var storedWeather = JSON.parse(localStorage.getItem('currentCity'));

    if (storedWeather !==null) {
        cityName=storedWeather;

        displayWeather();
        displayFiveDayForecast();
    }
}

//function to save city in array to lcoal
function storeCityArray() {
    localStorage.setItem("cities", JSON.stringify(cityList));
}

//function saves the displayed current city in to the lcoal
function storeCurrentCity() {
    localStorage.setItem("currentCity", JSON.stringify(cityName));
}

//ev ent handler for city search button
$("#citySearchBTN").on("click", function(event){
    event.preventDefault();

    cityname = $("#cityInput").val().trim();
    if(cityname === ""){
        alert("Please enter a city for a projected forecast")
    }else if (cityList.length >= 5){
        cityList.shift();
        cityList.push(cityName);
    }else{
        cityList.push(cityname);
    }
    storeCurrentCity();
    storeCityArray();
    renderCities();
    displayWeather();
    displayFiveDayForecast();
});

