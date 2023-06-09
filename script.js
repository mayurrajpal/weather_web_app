let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let windspeed=document.getElementsByClassName("windspeed");
let humidity=document.getElementsByClassName("humidity");
let iconfile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(searchInput.value);
  searchInput.value = "";
});

const getWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dab3af44de7d24ae7ff86549334e45bd`,

      { mode: "cors" }
    );

    const weatherData = await response.json();
    console.log(weatherData);
    const { name } = weatherData;
    const { feels_like,humidity } = weatherData.main;
    const { id, main } = weatherData.weather[0];
    const {speed} = weatherData.wind;
    loc.textContent = name;
    climate.textContent = main;
    tempvalue.textContent = Math.round(feels_like - 273);
    console.log(humidity,speed);
    document.querySelector(".humidity").innerText=humidity+"%";
    document.querySelector(".windspeed").innerText=speed+"km/h";

    if (id < 300 && id >= 200) {
      tempicon.src = "./thunderstorm.svg";
    } else if (id < 400 && id >= 300) {
      tempicon.src = "./drizzle.svg";
    } else if (id < 600 && id >= 500) {
      tempicon.src = "./rain.svg";
    } else if (id < 700 && id >= 600) {
      tempicon.src = "./snow.svg";
    } else if (id > 800) {
      tempicon.src = "./clouds.svg";
    } else if (id == 800) {
      tempicon.src = "./sun.svg";
    }else if (id == 701) {
      tempicon.src = "./mist.svg";
    }else if (id == 711) {
      tempicon.src = "./carbon-dioxide.svg";
    }else if (id == 721) {
      tempicon.src = "./haze.svg";
    }
  } catch (error) {
    alert("city not found");
  }
};

