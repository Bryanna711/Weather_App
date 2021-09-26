var apiKey = "6f4c7b20c0ac21babe67fa4094189af6"
var cityInput = document.getElementById("cityInput");
var stateCode;
var searchBtnEl= document.querySelector(".searchBtn");
var input = cityInput.value.trim()

// var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + city + stateCode + "&appid=" + apiKey;
// var queryURL5Day = "api.openweathermap.org/data/2.5/forecast?q=" + city + stateCode + "&appid=" + apiKey;

function currentWeather(city) {
    var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
    //api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial

    fetch(currentURL)
        .then(function (res){
            return res.json()
        })
        .then(function(data){
        console.log(data);

        var temp = data.main.temp;
        console.log(temp)
        
        var wind = data.wind.speed;
        console.log(wind);
        
        var humidity = data.main.humidity;
        console.log (humidity);
        
        var cityName = data.name;
        
        
        document.getElementById("temp").innerHTML = "Temp: " + temp + " F";
        
        document.getElementById("wind").innerHTML = "Wind: " + wind + " MPH";
        
        document.getElementById("humidity").innerHTML = "Humidity: " + humidity + "%";
        
        document.getElementById("cityEntered").innerHTML = cityName;
        
        function pullWeatherData(){
            var lat = data.coord.lat;
            console.log(lat);
            var lon = data.coord.lon;
            console.log(lon);
            uv(lat, lon);
        
        };
        pullWeatherData();
    });
}



 function uv(lat, lon){
     var oneDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" +lon + "&exclude=minutely,hourly&appid="+ apiKey + "&units=imperial";
     fetch(oneDayURL)
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            console.log(data);
        
        var uvIndex=data.current.uvi;
        console.log(uvIndex)
        var currentDate= data.current.dt;
        console.log(currentDate);
        var convertedDate = moment.unix(currentDate).format(("  MMM Do, YYYY"));
        console.log(convertedDate)

        var dailyForcast= [
            {

            }
        ]

       

        document.getElementById("uv").innerHTML = "UV Index: " + uvIndex;
        document.getElementById("date").innerHTML = convertedDate;


    
   
  
    

        });
    }
 

function searchHandler(event){
if(!cityInput.value){
    return
}
event.preventDefault();
    var input = cityInput.value.trim();
    console.log(input);
    currentWeather(input);
    uv(input);
    cityInput.value = '';
};

searchBtnEl.addEventListener("click", searchHandler);



// fetch(queryURL)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     });

// fetch(queryURL5Day)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     });

// function fiveDay(city){
//     var multiDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
//     fetch(multiDayURL)
//         .then(function(res){
//             return res.json()
//         })
//         .then(function(data){
//             console.log(data);
        

//         })
// }

