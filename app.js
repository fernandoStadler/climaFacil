const apiKey = "5d3563cbe4e9703a92a2e65d949b142c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const check = document.querySelector('[data-check]')
const container = document.querySelector('[data-container]');

const btnSearch = document.getElementById('btnSearch');
const weatherList = document.getElementById("weatherList");


check.addEventListener('change', toggleBackground=()=>{
    if(check.checked){
      console.log("checked")
      container.style.background = '#fff'
      container.style.color = '#1d1d1d'
    } else{
      
      console.log("unchecked")
      container.style.background = '#1d1d1d'
      container.style.color = '#fff'
    }
})


const getWeatherData = (latitude, longitude) => {
  const url = `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt_BR`;
  axios
    .get(url)
    .then((response) => {
      const weatherData = response.data;
      console.log(weatherData);
      const weatherIcon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
        console.log(weatherIcon);
      weatherList.innerHTML = `
        
        <li><img src="${weatherIcon}"></li>
        <li><strong>Cidade:</strong> ${weatherData.name}</li>
        <li><strong>Temperatura:</strong>${weatherData.main.temp}°C</li>
        <li><strong>Umidade:</strong> ${weatherData.main.humidity}%</li>
        <li><strong>Descrição:</strong> ${weatherData.weather[0].description}</li>
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
};

document.addEventListener('DOMContentLoaded', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getWeatherData(latitude, longitude);
      },
      () => {
        alert('Não foi possível obter a sua localização atual');
      }
    );
  } else {
    alert('Seu navegador não suporta Geolocalização');
  }
});

const getWeatherDataByCity = () => {
  const city = document.getElementById("cityInput").value;
  const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=pt_BR`;
  axios
    .get(url)
    .then((response) => {
      const weatherData = response.data;
      console.log(weatherData);
      const weatherIcon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
      weatherList.innerHTML = `
      <li class="icon"><img src="${weatherIcon}"></li>
      <li><strong>Cidade:</strong> ${weatherData.name}</li>
      <li><strong>Temperatura:</strong>${weatherData.main.temp}°C</li>
      <li><strong>Umidade:</strong> ${weatherData.main.humidity}%</li>
        <li><strong>Descrição:</strong> ${weatherData.weather[0].description}</li>
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
toggleBackground();
btnSearch.addEventListener('click', getWeatherDataByCity);
