import React from "react";

const WeatherCard = () => {
  const weatherData = {
    coord: { lon: 11, lat: 44.34 },
    weather: [
      {
        id: 804,
        main: "Clouds",
        description: "overcast clouds",
        icon: "04n",
      },
    ],
    main: {
      temp: 276.01,
      feels_like: 273.06,
      pressure: 1013,
      humidity: 87,
    },
    wind: {
      speed: 3.03,
      deg: 218,
    },
    clouds: {
      all: 91,
    },
  };

  return (
    <div className="w-64 p-4 rounded-lg shadow-lg bg-accent text-gray-800">
      <div className="text-3xl font-bold flex items-center mb-4">
        {weatherData.main.temp}°C
      
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 40 40"
          className="dark:hidden w-[32px] h-[32px] md:w-[40px] md:h-[40px]"
        >
          <path
            fill="#E66D45"
            fill-rule="evenodd"
            d="M31.523 23.362A10 10 0 0 1 28 24c-5.523 0-10-4.477-10-10 0-2.251.744-4.329 2-6-6.628 0-12 5.373-12 12s5.373 12 12 12c5.46 0 10.069-3.647 11.523-8.638"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <ul className="text-lg space-y-2">
        <li className="flex flex-row justify-between gap-2">
          <h2>Feels like:</h2> <h2>{weatherData.main.feels_like}°C</h2>
        </li>
        <li className="flex flex-row justify-between gap-2">
          <h2>Precipitation:</h2> <h2>0 mm</h2>
        </li>
        <li className="flex flex-row justify-between gap-2">
          <h2>Wind speed:</h2> <h2>{weatherData.wind.speed} m/s</h2>
        </li>
        <li className="flex flex-row justify-between gap-2">
          <h2>Wind direction:</h2> <h2>{weatherData.wind.deg}°</h2>
        </li>
        <li className="flex flex-row justify-between gap-2">
          <h2>Humidity:</h2> <h2>{weatherData.main.humidity}%</h2>
        </li>
        <li className="flex flex-row justify-between gap-2">
          <h2>Clouds:</h2> <h2>{weatherData.clouds.all}%</h2>
        </li>
        <li className="flex flex-row justify-between gap-2">
          <h2>Pressure:</h2> <h2>{weatherData.main.pressure} hPa</h2>
        </li>
      </ul>
    </div>
  );
};

export default WeatherCard;
