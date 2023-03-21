const apiKey = '5d3563cbe4e9703a92a2e65d949b142c';
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const check = document.querySelector('[data-check]')
const container = document.querySelector('[data-container]');
const navBar = document.querySelector('.navBar');
const btnSearch = document.getElementById('btnSearch');
const weatherList = document.getElementById("weatherList");

console.log(navBar)


const setWeatherIcon = (callParam, getDescription, setWeatherIcon) => {
  if (callParam.weather[0].description == getDescription) {
    return wi_icon = setWeatherIcon
  }
}
const getWeatherData = (latitude, longitude) => {
  const url = `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt_BR`;
  axios
    .get(url)
    .then((response) => {
      
      const weatherData = response.data;
      const returnDescription = weatherData.weather[0].description
      const returnName= weatherData.name
      const returnTemp = weatherData.main.temp
      const returnHumidity = weatherData.main.humidity
      
      setWeatherIcon(weatherData, returnDescription, climaticType[`${returnDescription}`])
      
      weatherList.innerHTML = `
      <li><i class="wi ${wi_icon}" id="myIcon"></i></li>
      <li><strong>Cidade:</strong> ${returnName}</li>
        <li><strong>Temperatura:</strong>${returnTemp}°C</li>
        <li><strong>Umidade:</strong> ${returnHumidity}%</li>
        <li><strong>Descrição:</strong> ${returnDescription}</li>
      `;
    })
    .catch(() => {
      weatherList.innerHTML = `
          <li><strong>Cidade não localizada, por favor digite uma cidade valida!</li>
          `;
      setTimeout(() => {
        weatherList.innerHTML = `
          `;
      }, 5000)
    });
  const isDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  weatherList.style.background = isDarkTheme ? '#1d1dd1d' : '#fff';
  container.style.background = isDarkTheme ? '#1d1dd1d' : '#f8f8f8';
  container.style.color = isDarkTheme ? '#fff' : '#1d1d1d'
  navBar.style.background = isDarkTheme ? '#1d1dd1d' : '#e4e1ec';
  navBar.style.color = isDarkTheme ? '#fff' : '#1d1d1d'
};

document.addEventListener('DOMContentLoaded', () => {
  navigator.geolocation ?
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getWeatherData(latitude, longitude);
      },
      () => {
        alert('Não foi possível obter a sua localização atual');
      }
    )
    :
    alert('Seu navegador não suporta Geolocalização');
});
const getWeatherDataByCity = () => {
  const city = document.getElementById("cityInput").value;
  const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=pt_BR`;
  axios
    .get(url)
    .then((response) => {
      const weatherData = response.data;
      
      const returnName= weatherData.name
      const returnTemp = weatherData.main.temp
      const returnHumidity = weatherData.main.humidity
      const returnDescription = weatherData.weather[0].description
      
      setWeatherIcon(weatherData, returnDescription, climaticType[`${returnDescription}`])
      
      weatherList.innerHTML = `
      <li><i class="wi ${wi_icon}" id="myIcon"></i></li>
      <li><strong>Cidade:</strong> ${returnName}</li>
      <li><strong>Temperatura:</strong>${returnTemp}°C</li>
      <li><strong>Umidade:</strong> ${returnHumidity}%</li>
        <li><strong>Descrição:</strong> ${returnDescription}</li>
      `;
    })
    .catch(() => {
      weatherList.innerHTML = `
          <li><strong>Cidade não localizada</li>
          `;
      setTimeout(() => {
        weatherList.innerHTML = `
          `;
      }, 5000)
    });
};
btnSearch.addEventListener('click', getWeatherDataByCity);
