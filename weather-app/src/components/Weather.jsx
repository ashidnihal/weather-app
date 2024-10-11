import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner,Table  } from 'react-bootstrap';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import './Weather.css';

function Weather() {
    const [weatherData, setWeatherData] = useState({});
    const [forecastData, setForecastData] = useState([]);
    const [cityName, setCityName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); 
    const weatherIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    };

    const search = async (city) => {
        setLoading(true); 
        try {
            
            const [currentWeatherResponse, forecastResponse] = await Promise.all([
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`),
                fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`)
            ]);

           
            const currentWeatherData = await currentWeatherResponse.json();
            const forecastData = await forecastResponse.json();

           
            const icon = weatherIcons[currentWeatherData.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: currentWeatherData.main.humidity,
                windspeed: currentWeatherData.wind.speed,
                temperature: Math.floor(currentWeatherData.main.temp),
                location: currentWeatherData.name,
                icon: icon,
                description: currentWeatherData.weather[0].description,
                pressure: currentWeatherData.main.pressure,
                feellike: currentWeatherData.main.feels_like,
            });

        
            const dailyData = forecastData.list.filter((reading) => reading.dt_txt.includes("12:00:00"));
            setForecastData(dailyData.map(forecast => ({
                date: forecast.dt_txt.split(" ")[0],
                temp: forecast.main.temp,
                description: forecast.weather[0].description,
                icon: weatherIcons[forecast.weather[0].icon] || clear_icon
            })));

            setError('');
        } catch (error) {
            console.error("Error fetching weather or forecast data:", error);
            setError('City not found, please try again.');
        } finally {
            setLoading(false); 
        }
    };

    const handleSearch = () => {
        if (cityName) {
            search(cityName);
            localStorage.setItem('lastCity', cityName);
            setCityName('');
        } else {
            setError('Please enter a city name.');
        }
    };

    useEffect(() => {
        const lastCity = localStorage.getItem('lastCity')

        if(lastCity){
            search(lastCity)
        }else{
            search("kerala");
         }

    }, []);

    return (
        <Container className="app-wrapper">
           
            <Row className="mt-4">
                <Col md={4} xs={7} className="mx-2 input-bar-col">
                    <Form.Control type="text" placeholder="Search for cities" className="search-bar" onChange={(e) => setCityName(e.target.value)} />
                </Col>
                <Col md={2} xs={4} className="button-col">
                    <Button className="search-button" variant="primary" onClick={handleSearch}>Search</Button>
                </Col>
            </Row>
            {error && <p className="text-danger mx-2">{error}</p>}

          
            {loading ? (
                
                <Row className="justify-content-center mt-4">
                <Spinner animation="border" variant="primary" />
            </Row>
            ) : (
                <>
                   
                    <Row className="weather-info mt-4 align-items-center">
                        <Col md={4} className="current-weather ">
                            <h2>{weatherData.location}</h2>
                            <h1>{weatherData.temperature}°C</h1>
                            <p>{weatherData.description}</p>
                        </Col>
                        <Col md={3} className="weather-icon text-center me-5">
                            <img className="mt-3" src={weatherData.icon} alt="" />
                        </Col>

                        
                        <Col md={4} className="weekly-forecast">
                            <h5 className="text-center">5-Day Forecast</h5>
                            <Table  className="text-center">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Icon</th>
                                        <th>Description</th>
                                        <th>Temp (°C)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {forecastData.map((forecast, index) => (
                                        <tr key={index}>
                                            <td>{forecast.date}</td>
                                            <td>
                                                <img
                                                    src={forecast.icon}
                                                    alt={forecast.description}
                                                    className="forecast-icon"
                                                />
                                            </td>
                                            <td>{forecast.description}</td>
                                            <td>{forecast.temp}°C</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>

                    </Row>

                 
                    <Row className="air-conditions mx-2 mt-5 pb-1 ">
                        <Col md={3} className="text-center">
                            <h6>Real Feel: {weatherData.feellike}</h6>
                        </Col>
                        <Col md={3} className="text-center">
                            <h6>Wind: {weatherData.windspeed ? weatherData.windspeed : 'N/A'} km/h</h6>
                        </Col>
                        <Col md={3} className="text-center">
                            <h6>Pressure: {weatherData.pressure}</h6>
                        </Col>
                        <Col md={3} className="text-center">
                            <h6>Humidity: {weatherData.humidity}</h6>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
}

export default Weather;
