var searchForm = document.querySelector('#search-form');
var searchParameter = document.querySelector('#search-parameter');
var currentForecastEl = document.querySelector('#current-forecast')
var fiveDayDataEl = document.querySelector('#five-day-data');

var recentlySearched = [];
var day = new Date()

var clickHandler = function(event){
  event.preventDefault()
  if(searchParameter.value == ""){
    window.alert('Please enter a location in the search box.')
  }
  else{
    //saveData(searchParameter.value)
    getLocation(searchParameter.value);
  }
  
}
var getLocation = function(location){
  var apiKey = 'AjnaBhW02abtslHZhIrbRlAV1U3-RLPBR0l2PUqu6ZnG2LGl0q8h-wr-F1wTDKpm';
  var apiUrl = 'http://dev.virtualearth.net/REST/v1/Locations?query='+location+'&key='+apiKey;

  fetch(apiUrl)
  .then(function(response) {
    if (response.ok) {
      return response.json();
    }
    else {
      window.alert('Please enter a valid location')
      return;
    }
  })
  .then(function(data) {
    var latitude = data.resourceSets[0].resources[0].point.coordinates[0]
    var longitude = data.resourceSets[0].resources[0].point.coordinates[1]
    getWeatherData(latitude,longitude,location);
  })
}

var getWeatherData = function(lat, lon, location) {
  var apikey = '75cc5642ba9df026f6ee5cf9d995c9c4';
  var apiurl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=imperial&appid='+apikey;
  fetch(apiurl)
  .then(function(response) {
    if(response.ok){
      return response.json()
    }
    else{
      alert('Location\'s weather data not found')
      return;
    }
  })
  .then(function(data) {
    displayCurrentForecast(data.current, location);
    displayFiveDay(data.daily, location)
  })
}

var displayCurrentForecast = function(data, location){
  console.log(data);
  currentForecastEl.innerHTML = '';

  var singleDayEl = document.createElement("div");
  var dateEl = document.createElement('h3');
  var iconEl = document.createElement('img');
  var tempEl = document.createElement('p');
  var windEl = document.createElement('p');
  var humidityEl = document.createElement('p');
  var uvIndexEl = document.createElement('div');
  var uvButtonEl = document.createElement('button');

  singleDayEl.classList = "tile is-parent notification is-info is-flex is-flex-direction-column is-outlined m-1";
  dateEl.textContent = location + ' ' +(day.getMonth()+1) + '/' + day.getDate() + '/' + day.getFullYear();
  iconEl.setAttribute('src', 'https://openweathermap.org/img/w/'+ data.weather[0].icon +'.png');
  tempEl.textContent = 'Temp: ' + data.temp + '°F';
  windEl.textContent = 'Wind Speed: ' + data.wind_speed + ' MPH';
  humidityEl.textContent = 'Humidity: ' + data.humidity;
  uvIndexEl.textContent = 'UV Index: ';
  if(data.uvi < 2){
    uvButtonEl.classList = 'button is-success';
  }
  else if(data.uvi > 2 && data.uvi < 6){
    uvButtonEl.classList = 'button is-warning';
  }
  else{
    uvButtonEl.classList = 'button is-danger';
  }
  uvButtonEl.textContent = data.uvi;

  uvIndexEl.appendChild(uvButtonEl);

  singleDayEl.appendChild(dateEl);
  singleDayEl.appendChild(iconEl);
  singleDayEl.appendChild(tempEl);
  singleDayEl.appendChild(windEl);
  singleDayEl.appendChild(humidityEl);
  singleDayEl.appendChild(uvIndexEl);

  currentForecastEl.appendChild(singleDayEl);
}

var displayFiveDay = function(data){
  fiveDayDataEl.innerHTML = '';
  for (i=1 ; i<6 ; i++) {
    var singleDayEl = document.createElement("div");
    var dateEl = document.createElement('h3');
    var iconEl = document.createElement('img');
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p');

    singleDayEl.classList = "is-child notification is-warning my-4 mr-4";
    dateEl.textContent = (day.getMonth()+1) + '/' + (day.getDate()+i) + '/' + day.getFullYear();
    iconEl.setAttribute('src', 'https://openweathermap.org/img/w/'+ data[i].weather[0].icon +'.png');
    tempEl.textContent = 'Temp: ' + data[i].temp.day + '°F';
    windEl.textContent = 'Wind Speed: ' + data[i].wind_speed + ' MPH';
    humidityEl.textContent = 'Humidity: ' + data[i].humidity;

    singleDayEl.appendChild(dateEl);
    singleDayEl.appendChild(iconEl);
    singleDayEl.appendChild(tempEl);
    singleDayEl.appendChild(windEl);
    singleDayEl.appendChild(humidityEl);

    fiveDayDataEl.appendChild(singleDayEl)
  }
}

var saveData = function(location){

}

var loadData = function(){

}

searchForm.addEventListener('submit', clickHandler);