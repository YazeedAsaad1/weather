# Weather Location App

A web application that displays weather forecasts and related images for any location. Enter a location to see current weather conditions, a 3-day forecast, and beautiful images of that location.

## Demo

Check out the live demo: https://yazeedasaad.com/projects/1

## Features

- Search for any global location
- View current weather data
- See a 3-day forecast
- Browse location-related images
- Responsive design for all devices

## Technologies Used

- React
- Vite
- Weather API (weatherapi.com)
- Pixabay API for location images
- CSS for styling

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/weather-location-app.git
   cd weather-location-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your API keys:
   ```
   VITE_WEATHER_API_KEY=your_weather_api_key
   VITE_PIXABAY_API_KEY=your_pixabay_api_key
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## How to Get API Keys

### Weather API
1. Sign up at [Weather API](https://www.weatherapi.com/)
2. Navigate to your dashboard to get your API key

### Pixabay API
1. Create an account at [Pixabay](https://pixabay.com/)
2. Go to your account dashboard to find your API key

## Usage

Enter a location in the search box and press Enter or click the search button. The app will display the current weather, forecast, and images related to your search term.

## Deployment

This project is set up for easy deployment to Netlify. Don't forget to add your environment variables in the Netlify dashboard.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Weather API](https://www.weatherapi.com/) for weather data
- [Pixabay](https://pixabay.com/) for the image search API
- [Vite](https://vitejs.dev/) for the build tool
