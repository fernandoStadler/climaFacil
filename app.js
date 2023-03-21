const apiKey = "5d3563cbe4e9703a92a2e65d949b142c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const check = document.querySelector('[data-check]')
const container = document.querySelector('[data-container]');

const btnSearch = document.getElementById('btnSearch');
const weatherList = document.getElementById("weatherList");


const getIcon = (callParam, getDescription, getIcon) =>{
  if(callParam.weather[0].description == getDescription){
    imagem = getIcon
  }
}

const getWeatherData = (latitude, longitude) => {
  const url = `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt_BR`;
  axios
    .get(url)
    .then((response) => {
      const weatherData = response.data;
      let returnDescription = weatherData.weather[0].description
      getIcon(weatherData,returnDescription,climaticType[`${returnDescription}`])
      console.log(climaticType[`${returnDescription}`]); 

      const weatherIcon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
      weatherList.innerHTML = `
      <li><i class="wi ${imagem}" id="myIcon"></i></li>
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
 

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      container.style.background = '#1d1dd1d'
      container.style.color = '#fff'      
    } else {
      container.style.background = '#fff'
      container.style.color = '#1d1d1d'
    }
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
      let returnDescription = weatherData.weather[0].description
      getIcon(weatherData,returnDescription,climaticType[`${returnDescription}`])
      weatherList.innerHTML = `
      <li><i class="wi ${imagem}" id="myIcon"></i></li>
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

btnSearch.addEventListener('click', getWeatherDataByCity);
