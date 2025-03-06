import React, { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [weatherApi, setWeatherApi] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [errorWeather, setErrorWeather] = useState(null);
  const [theLocation, setLocation] = useState('');
  const [imagesApi, setImagesApi] = useState(null);
  const [errorImages, setErrorImages] = useState(null);

  // Fetch weather data when the location changes
  useEffect(() => {
    if (theLocation !== '') {
      setLoadingWeather(true);
      setErrorWeather(null);
      fetch(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${theLocation}&days=3&aqi=no&alerts=no`)
        .then((response) => response.json())
        .then((data) => {
          setWeatherApi(data);
          setLoadingWeather(false);
        })
        .catch((error) => {
          setErrorWeather(error);
          setLoadingWeather(false);
        });
    }
  }, [theLocation]);
  
  // Fetch images data when the location changes
  useEffect(() => {
    if (theLocation !== '') {
      setErrorImages(null);
      fetch(
        `https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_API_KEY}&q=${theLocation}&image_type=photo`
      )
        .then((response) => response.json())
        .then((data) => setImagesApi(data))
        .catch((error) => setErrorImages(error));
    }
  }, [theLocation]);
  // --- Header Section Logic ---
  function enterButton(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const theInput = document.getElementById('search');
      setLocation(theInput.value);
      theInput.value = '';
    }
  }

  function handelChange() {
    const theInput = document.getElementById('search');
    setLocation(theInput.value);
    theInput.value = '';
  }

  function randomNumber() {
    if (imagesApi && imagesApi.hits && imagesApi.hits.length > 0) {
      return Math.floor(Math.random() * imagesApi.hits.length);
    }
    return 0;
  }

  const sunset =
    weatherApi && weatherApi.forecast
      ? weatherApi.forecast.forecastday[0].astro.sunset
      : '';
  const sunrise =
    weatherApi && weatherApi.forecast
      ? weatherApi.forecast.forecastday[0].astro.sunrise
      : '';

  const headerStyles =
    imagesApi && imagesApi.hits && imagesApi.hits.length !== 0
      ? {
          background: `url("${imagesApi.hits[randomNumber()].largeImageURL}") no-repeat center`,
        }
      : {
          background: `url("../images/whiteCloud.jpeg") no-repeat center center`,
        };

  // --- Weather Info Section ---
  function renderWeatherInfo() {
    function remove() {
      setLocation('');
    }
    if (
      !weatherApi ||
      !weatherApi.location ||
      !weatherApi.current ||
      !weatherApi.forecast
    ) {
      return (
        <div className="info">
          <div className="subInfo">
            <div className="todayDiv">
              <h1>There's something went wrong. Please try again later.</h1>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="info">
        {/* <div className="x" onClick={remove}>
          X
        </div> */}
        <div className="subInfo">
          <div className="todayDiv">
            <h1>Today's Weather</h1>
            <p>
              Weather today in <b>{weatherApi.location.name}</b> will be{' '}
              <b>{weatherApi.current.condition.text}</b>. The daytime temperature
              is going to reach{' '}
              <b>{weatherApi.forecast.forecastday[0].day.maxtemp_c} °C</b> and the
              temperature will dip to{' '}
              <b>{weatherApi.forecast.forecastday[0].day.mintemp_c} °C</b> at night.
              The humidity will be around{' '}
              <b>{weatherApi.forecast.forecastday[0].day.avghumidity}%</b> and wind
              speed will be at{' '}
              <b>{weatherApi.forecast.forecastday[0].day.maxwind_kph} km/h</b>.
            </p>
          </div>
          <img src={weatherApi.current.condition.icon} alt="Weather icon" />
        </div>
        <div className="subInfo">
          <div className="todayDiv">
            <h1>Tomorrow's Weather</h1>
            <p>
              Weather tomorrow in <b>{weatherApi.location.name}</b> will be{' '}
              <b>{weatherApi.forecast.forecastday[1].day.condition.text}</b>.
              The daytime temperature is expected to reach{' '}
              <b>{weatherApi.forecast.forecastday[1].day.maxtemp_c} °C</b> and the
              temperature will drop to{' '}
              <b>{weatherApi.forecast.forecastday[1].day.mintemp_c} °C</b> at night.
              The humidity will be around{' '}
              <b>{weatherApi.forecast.forecastday[1].day.avghumidity}%</b> and wind
              speed will be at{' '}
              <b>{weatherApi.forecast.forecastday[1].day.maxwind_kph} km/h</b>.
            </p>
          </div>
          <img
            src={weatherApi.forecast.forecastday[1].day.condition.icon}
            alt="Weather icon"
          />
        </div>
      </div>
    );
  }

  // --- Common Locations Section ---
  function smoothScroll() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  // --- Main Render ---
  return (
    <div>
      {/* Header Section */}
      <div className="headerContainer">
        <div className="header" style={headerStyles}>
          <h1>Discover current weather</h1>
          <p>Accurate weather data at your fingertips!</p>
          <div className="searchInput">
            <div className="search">
              <label htmlFor="search">Search location</label>
              <input
                onKeyDown={enterButton}
                type="text"
                id="search"
                name="location"
                placeholder="Enter location"
              />
            </div>
            <div className="sunrise">
              <label htmlFor="sunrise">Sunrise time</label>
              <input type="text" id="sunrise" disabled value={sunrise} />
            </div>
            <div className="sunset">
              <label htmlFor="sunset">Sunset time</label>
              <input type="text" id="sunset" disabled value={sunset} />
              <button type="button">
                <img
                  src="images/right-arrow.svg"
                  alt="arrow"
                  onClick={handelChange}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading and Error Messages */}
      {loadingWeather && <div>Loading...</div>}
      {errorWeather && <div>Error: {errorWeather.message}</div>}

      {/* Weather Info Section */}
      {theLocation && weatherApi && renderWeatherInfo()}

      {/* Common Locations */}
      <div className="container">
        <div className="commonLocation">
          <h2>Most searched locations</h2>
          <div
            className="one"
            onClick={() => {
              smoothScroll();
              setLocation('weather+new+york');
            }}
          >
            <p>New York</p>
          </div>
          <div
            className="two"
            onClick={() => {
              smoothScroll();
              setLocation('weather+Tokyo');
            }}
          >
            <p>Tokyo</p>
          </div>
          <div
            className="three"
            onClick={() => {
              smoothScroll();
              setLocation('weather+Berlin');
            }}
          >
            <p>Berlin</p>
          </div>
          <div
            className="four"
            onClick={() => {
              smoothScroll();
              setLocation('weather+Sydney');
            }}
          >
            <p>Sydney</p>
          </div>
          <div
            className="five"
            onClick={() => {
              smoothScroll();
              setLocation('weather+Paris');
            }}
          >
            <p>Paris</p>
          </div>
          <div
            className="six"
            onClick={() => {
              smoothScroll();
              setLocation('weather+Amman');
            }}
          >
            <p>Amman</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
