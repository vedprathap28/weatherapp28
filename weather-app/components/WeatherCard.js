import './WeatherCard.css'

const getTemperatureEmoji = temperature => {
  if (temperature < 10) return '🥶'
  if (temperature < 20) return '🧥'
  if (temperature < 30) return '☀️'
  return '🔥'
}

const getHumidityEmoji = humidity => {
  if (humidity < 30) return '🥵'
  if (humidity < 60) return '😊'
  return '💦'
}

const getWindSpeedEmoji = windSpeed => {
  if (windSpeed < 5) return '🍃'
  if (windSpeed < 10) return '🌬️'
  return '🌪️'
}

const WeatherCard = ({data, darkMode}) => {
  if (!data || !data.dateTime) {
    // Handle the case where data or dateTime is not provided
    return null
  }

  const temperatureEmoji = getTemperatureEmoji(data.temperature)
  const humidityEmoji = getHumidityEmoji(data.humidity)
  const windSpeedEmoji = getWindSpeedEmoji(data.windSpeed)

  const capitalizedLocation =
    data.location.charAt(0).toUpperCase() + data.location.slice(1)

  const capitalizedDescription =
    data.description.charAt(0).toUpperCase() + data.description.slice(1)

  return (
    <div className={`weather-card ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="location-container">
        <h2 className="location">{capitalizedLocation}</h2>
        <div className="date-description">
          <p className="date">{data.dateTime}</p>
          <p className="description">{capitalizedDescription}</p>
        </div>
      </div>
      <p className="temperature">
        <span className="big-text">{data.temperature}°C</span>{' '}
        <span className="emoji">{temperatureEmoji}</span>
      </p>
      <div className="space">
        <div className="detail">
          <div className="flex">
            <span className="humidity-text">{data.humidity}%</span>{' '}
            <span className="small-emoji">{humidityEmoji}</span>
          </div>
          <p>Humidity</p>
        </div>
        <div className="detail">
          <div className="flex">
            <span className="wind-text">{data.windSpeed} m/s</span>{' '}
            <span className="small-emoji">{windSpeedEmoji}</span>
          </div>
          <p>Wind Speed</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
