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

    for (i=0; i<cityList.length; i++){
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

//event handler for user hitting enter after inserting search term
$("#cityInput").keypress(function(e){
    if(e.which == 13){
        $("#citySearchBtn").click();
    }
})

//this function runs the API and display city and weather info
async function displayWeather() {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname +"&units=imperial&appid=d3b85d453bf90d469c82e650a0a3da26";

    var response = await $.ajax({
        url: queryURL,
        method: "GET"
    })
    console.log(response);

    var currentWeatherDiv = $("<div class='card-body' id='currentWeather'>");
    var getCurrentCity = response.name;
    var date = new Date();
    var val=(date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
    var getCurrentWeatherIcon = response.weather[0].icon;
    var displayCurrentWeatherIcon = $("<img src = http://openweathermap.org/img/wn/" + getCurrentWeatherIcon + "@2x.png />");
    var currentCityEl = $("<h3 class = 'card-body'>").text(getCurrentCity+" ("+val+")");
    currentCityEl.append(displayCurrentWeatherIcon);
    currentWeatherDiv.append(currentCityEl);
    var getTemp = response.main.temp.toFixed(1);
    var tempEl = $("<p class='card-text'>").text("Temperature: "+getTemp+"° F");
    currentWeatherDiv.append(tempEl);
    var getHumidity = response.main.humidity;
    var humidityEl = $("<p class='card-text'>").text("Humidity: "+getHumidity+"%");
    currentWeatherDiv.append(humidityEl);
    var getWindSpeed = response.wind.speed.toFixed(1);
    var windSpeedEl = $("<p class='card-text'>").text("Wind Speed: "+getWindSpeed+" mph");
    currentWeatherDiv.append(windSpeedEl);
    var getLong = response.coord.lon;
    var getLat = response.coord.lat;

    var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=d3b85d453bf90d469c82e650a0a3da26&lat="+getLat+"&lon="+getLong;
    var uvResponse = await $.ajax({
        url: uvURL,
        method: "GET"
    })

    //UV index and setting color class

}