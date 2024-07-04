# React Native Project with Expo, Tamagui, and TMDb API Integration

## Description

This project is a mobile application developed with React Native using Expo, Tamagui for UI design, and Drawer for navigation. It integrates the TMDb API to provide a rich set of features related to movies and TV shows. The application is designed to be user-friendly and maintainable, with a clear and modular structure.

## Features

- **React Native with Expo**: Fast and efficient mobile app development.
- **Tamagui**: Modern and responsive UI design.
- **Drawer Navigation**: Intuitive and accessible navigation.
- **TMDb API Integration**: Access to a vast database of movies, TV shows, and celebrity information.
  - **Search**: Search for movies, TV shows, and people.
  - **Trending**: View trending movies and TV shows.
  - **Details**: Access detailed information about movies, TV shows, and people, including cast, crew, and reviews.
  - **Images**: View posters, backdrops, and other related images.
  - **Genres**: Browse content by genres.
  - **Watch Providers**: Information about where to watch the content.
  - **User Authentication**: Allow users to log in, create favorite lists, rate movies, and more.

## How to use this repository?

1. Run `npm install` to install all dependencies.
2. Run `expo prebuild` to create the native projects.
3. Run `expo run:ios` or `expo run:android` to start the app.

## TMDb API Integration

To use the TMDb API, follow these steps:

1. **Sign up for an API Key**:
   - Visit [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api) and sign up for an API key.

2. **Configure the API Key**:
   - Store the API key in a secure place, such as environment variables or a secure storage solution within the app.

3. **API Requests**:
   - Use the API key to make requests to the TMDb endpoints, such as searching for movies, getting details, and more. 

Example of making an API request using `fetch`:

```javascript
const API_KEY = 'YOUR_TMDB_API_KEY';
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchMovies = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};
