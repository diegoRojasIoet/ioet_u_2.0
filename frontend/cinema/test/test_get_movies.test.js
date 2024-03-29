import { jest } from '@jest/globals'
import { get_movies } from "../javascript/get-movies.js"
import { get_movie_by_id } from "../javascript/get-movie.js"
import { moviesResponse } from "./mocks/mock_movies.js"
import { movieResponse } from "./mocks/mock_movie.js"
import { API_URL, OPTIONS, API_MOVIE_ID_URL } from "../javascript/constants.js"


describe('users service', () => {
  it('get_movies should return a json with a list of movies', async () => {
    const mockFetch = Promise.resolve({
      text: () => Promise.resolve(moviesResponse),
    });

    global.fetch = jest.fn().mockImplementation(() => mockFetch);

    const response = await get_movies();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}`, { "headers": { "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com", "X-RapidAPI-Key": "f4ccb234bamshd5a8e3e972f5eb3p1b55f1jsnf0aa770bcab3" }, "method": "GET" });
    expect(response).toEqual(JSON.parse(moviesResponse).results);
  });
  
  it('get_movie should return a json with a movie', async () => {
    const mockFetch = Promise.resolve({
      text: () => Promise.resolve(movieResponse),
    });
    const ID = 'tt0055254'
    const MOVIE_URL = API_MOVIE_ID_URL(ID)

    console.log("mock")
    console.log(JSON.parse(movieResponse).results)

    global.fetch = jest.fn().mockImplementation(() => mockFetch);

    const response = await get_movie_by_id(ID);
    console.log("response")
    console.log(response)

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${MOVIE_URL}`, { "headers": { "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com", "X-RapidAPI-Key": "f4ccb234bamshd5a8e3e972f5eb3p1b55f1jsnf0aa770bcab3" }, "method": "GET" });
    expect(response).toEqual(JSON.parse(movieResponse).results);
  });
});