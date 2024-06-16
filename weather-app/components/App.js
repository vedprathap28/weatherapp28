import {useState} from 'react'
import './App.css'
import WeatherCard from './WeatherCard'

const App = () => {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const changeHandler = e => {
    setCity(e.target.value.toLowerCase())
  }

  const submitHandler = e => {
    e.preventDefault()
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`,
    )
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found')
        }
        return response.json()
      })
      .then(data => {
        const kelvin = data.main.temp
        const celsius = kelvin - 273.15
        const currentDateTime = new Date().toLocaleString()
        const newWeatherData = {
          id: data.id,
          location: data.name,
          country: data.sys.country,
          temperature: Math.round(celsius),
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          description: data.weather[0].description,
          dateTime: currentDateTime,
        }
        setWeatherData(prevData => [newWeatherData, ...prevData])
        setErrorMessage('')
      })
      .catch(error => {
        console.error('Error fetching data:', error.message)
        setErrorMessage('City not found. Please enter a valid city name.')
      })
    setCity('')
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`bg-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="card">
        <div className="toggle-container">
          <span className="mode-text">
            {darkMode ? 'Dark Mode' : 'Light Mode'}
          </span>
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <span className="slider round visually-hidden">&#8203;</span>
          </label>
        </div>
        <div className="card-body">
          <div className="header">
            <h1 className="card-title">Weather App</h1>
          </div>
          <form onSubmit={submitHandler}>
            <input
              id="city"
              type="text"
              name="city"
              onChange={changeHandler}
              value={city}
              placeholder="Enter city name"
              className="city-input"
            />
            <br />
            <br />
            <input
              type="submit"
              value="Get Temperature"
              className={`submit-btn ${darkMode ? 'dark-mod' : ''}`}
            />
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <br />
          <br />
          <h2 className="recent-search">Recent Searches</h2>
          <div className="recent-searches">
            {weatherData.map(data => (
              <WeatherCard key={data.id} data={data} darkMode={darkMode} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
