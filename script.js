var apiKey = "6f4c7b20c0ac21babe67fa4094189af6"
var cityInput = document.getElementById("cityInput");
var searchBtnEl = document.querySelector(".searchBtn");
var input = cityInput.value.trim()

function currentWeather(city) {
    var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
    //api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial

    fetch(currentURL)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            console.log(data);

            var temp = data.main.temp;
            console.log(temp)

            var wind = data.wind.speed;
            console.log(wind);

            var humidity = data.main.humidity;
            console.log(humidity);

            var cityName = data.name;

            document.getElementById("temp").innerHTML = "Temp: " + temp + " F";
            document.getElementById("wind").innerHTML = "Wind: " + wind + " MPH";
            document.getElementById("humidity").innerHTML = "Humidity: " + humidity + "%";
            document.getElementById("cityEntered").innerHTML = cityName;

            function pullWeatherData(data) {
                var lat = data.coord.lat;
                console.log(lat);
                var lon = data.coord.lon;
                console.log(lon);
                uv(lat, lon);
                console.log(data[1])
            }
            pullWeatherData(data);
        });

};





function uv(lat, lon) {
    var oneDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
    fetch(oneDayURL)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);

            var uvIndex = data.current.uvi;
            console.log(uvIndex);

            function uvColor() {
                if (2> uvIndex >= 0) {
                    $("uvClass").toggleClass("safe");
                }
                else if (2< uvIndex <= 5) {
                    $("uvClass").toggleClass("moderate");
                }
                else if (5< uvIndex <= 7) {
                    $("uvClass").toggleClass("high");
                }
                else if (7< uvIndex <= 10) {
                    $("uvClass").toggleClass("veryhigh");
                }
                else if (uvIndex > 10) {
                    $("uvClass").toggleClass("dangerzone");
                };
            };
            uvColor();

            var currentDate = data.current.dt;
            console.log(currentDate);
            var convertedDate = moment.unix(currentDate).format(("  MMM Do, YYYY"));
            console.log(convertedDate);

            //Icon not working....
            var currentIcon = data.current.weather.icon;
            console.log(currentIcon);

            var arrayDay = data.daily;
            console.log(arrayDay)

            var date1 = data.daily[1].dt;
            var date2 = data.daily[2].dt;
            var date3 = data.daily[3].dt;
            var date4 = data.daily[4].dt;
            var date5 = data.daily[5].dt;

            var convertDate1 = moment.unix(date1).format(("  MMM Do, YYYY"));
            var convertDate2 = moment.unix(date2).format(("  MMM Do, YYYY"));
            var convertDate3 = moment.unix(date3).format(("  MMM Do, YYYY"));
            var convertDate4 = moment.unix(date4).format(("  MMM Do, YYYY"));
            var convertDate5 = moment.unix(date5).format(("  MMM Do, YYYY"));
            console.log(convertDate5)

            var temp1 = data.daily[1].temp.day;
            var temp2 = data.daily[2].temp.day;
            var temp3 = data.daily[3].temp.day;
            var temp4 = data.daily[4].temp.day;
            var temp5 = data.daily[5].temp.day;

            var wind1 = data.daily[1].wind_speed;
            var wind2 = data.daily[2].wind_speed;
            var wind3 = data.daily[3].wind_speed;
            var wind4 = data.daily[4].wind_speed;
            var wind5 = data.daily[5].wind_speed;

            var humidity1 = data.daily[1].humidity;
            var humidity2 = data.daily[2].humidity;
            var humidity3 = data.daily[3].humidity;
            var humidity4 = data.daily[4].humidity;
            var humidity5 = data.daily[5].humidity;


            document.getElementById("uv").innerHTML = " " + uvIndex;
            document.getElementById("date").innerHTML = convertedDate;
            document.getElementById("currentIcon").innerHTML = currentIcon;

            document.getElementById("date1").innerHTML = convertDate1;
            document.getElementById("date2").innerHTML = convertDate2;
            document.getElementById("date3").innerHTML = convertDate3;
            document.getElementById("date4").innerHTML = convertDate4;
            document.getElementById("date5").innerHTML = convertDate5;

            document.getElementById("temp1").innerHTML = "Temp: " + temp1 + "F";
            document.getElementById("temp2").innerHTML = "Temp: " + temp2 + "F";
            document.getElementById("temp3").innerHTML = "Temp: " + temp3 + "F";
            document.getElementById("temp4").innerHTML = "Temp: " + temp4 + "F";
            document.getElementById("temp5").innerHTML = "Temp: " + temp5 + "F";

            document.getElementById("wind1").innerHTML = "Wind Speed: " + wind1 + "MPH";
            document.getElementById("wind2").innerHTML = "Wind Speed: " + wind2 + "MPH";
            document.getElementById("wind3").innerHTML = "Wind Speed: " + wind3 + "MPH";
            document.getElementById("wind4").innerHTML = "Wind Speed: " + wind4 + "MPH";
            document.getElementById("wind5").innerHTML = "Wind Speed: " + wind5 + "MPH";

            document.getElementById("humidity1").innerHTML = "Humidity " + humidity1 + "%";
            document.getElementById("humidity2").innerHTML = "Humidity " + humidity2 + "%";
            document.getElementById("humidity3").innerHTML = "Humidity " + humidity3 + "%";
            document.getElementById("humidity4").innerHTML = "Humidity " + humidity4 + "%";
            document.getElementById("humidity5").innerHTML = "Humidity " + humidity5 + "%";
        }

        )};

    searchBtnEl.addEventListener("click", searchHandler);

    function searchHandler(event) {
        if (!cityInput.value) {
            return
        }
        event.preventDefault();
        var input = cityInput.value.trim();
        console.log(input);
        currentWeather(input);
        // uv(input);
        storeCity();
        cityInput.value = '';
    };

    function storeCity() {
        var storedCity = cityInput.value;
        localStorage.setItem("city", storedCity);

        var cityList = document.createElement("li");

        function renderCities() {
            var list = document.getElementById("listCities");
            list.appendChild(cityList);
            var render = localStorage.getItem("city");
            cityList.innerHTML = render;
            // cityList.addClass("list-group-item");
        }
        renderCities();
        console.log(renderCities)
    };





