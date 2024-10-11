# Weather Application

A simple Weather Application that fetches current weather and a 5-day forecast for any city using the OpenWeatherMap API.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Obtaining an API Key](#obtaining-an-api-key)
- [Live Demo](#Live-Demo)
- [License](#license)

## Technologies Used

- React
- Bootstrap
- OpenWeatherMap API

## Getting Started

To get a local copy of the project up and running, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/ashidnihal/weather-app.git
   ```
   Replace `yourusername` with your actual GitHub username.

2. Navigate to the project directory:
   ```bash
   cd weather-app
   ```

3. Install the required packages:
   ```bash
   npm install
   ```

### Usage

To run the application locally:

1. Start the development server:
   ```bash
   npm start
   ```

2. Open your web browser and go to `http://localhost:5173` to view the application.

## Obtaining an API Key

To obtain an API key from OpenWeatherMap:

1. Visit the [OpenWeatherMap website](https://openweathermap.org/).
2. Sign up for an account or log in if you already have one.
3. Navigate to the "API keys" section in your account settings.
4. Create a new API key and copy it.

5. **Important:** Create a `.env` file in the root directory of your project and add the following line, replacing `YOUR_API_KEY` with your actual API key:
   ```
   VITE_WEATHER_API_KEY=YOUR_API_KEY
   ```

## Live Demo

You can view the live demo of the Weather Application [here](https://weather-app639.netlify.app/).


## License

This project is licensed under the MIT License.
