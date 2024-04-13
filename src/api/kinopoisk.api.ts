import axios from "axios";
import { API_TOKEN, baseUrl, selectFields } from "../utils/constants";
import {
  ImagesResponse,
  Movie,
  MoviesResponse,
  ReviewsResponse,
  SeriesResponse,
} from "./types.api";

export const getMoviesByFilters = async ({
  limit = 10,
  page = 1,
  ageRating,
  country,
  year,
}: {
  limit?: number;
  page?: number;
  ageRating?: string;
  country?: string;
  year?: string;
}): Promise<MoviesResponse | undefined> => {
  try {
    const { data } = await axios.get<MoviesResponse>(
      `${baseUrl}v1.4/movie?${selectFields}&page=${page}&limit=${limit}${country && "&countries.name=" + country}${year && "&year=" + year}${ageRating && "&ageRating=" + ageRating}`,
      {
        headers: {
          "X-API-KEY": API_TOKEN,
        },
      },
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMoviesByName = async ({
  name,
  limit = 10,
  page = 1,
}: {
  name: string;
  limit?: number;
  page?: number;
}): Promise<MoviesResponse | undefined> => {
  try {
    const { data } = await axios.get<MoviesResponse>(
      `${baseUrl}v1.4/movie/search?query=${name}&page=${page}&limit=${limit}`,
      {
        headers: {
          "X-API-KEY": API_TOKEN,
        },
      },
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Получение фильма по клику (id)
export const getMovieById = async (id: number): Promise<Movie | undefined> => {
  try {
    const { data } = await axios.get<Movie>(`${baseUrl}v1.4/movie/${id}`, {
      headers: {
        "X-API-KEY": API_TOKEN,
      },
    });
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// Получение картинок по id фильма
export const getImagesByMovieId = async (
  id: number,
): Promise<ImagesResponse | undefined> => {
  try {
    const { data } = await axios.get<ImagesResponse>(
      `${baseUrl}v1.4/image?movieId=${id}`,
      {
        headers: {
          "X-API-KEY": API_TOKEN,
        },
      },
    );
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getSeriesByMovieId = async (
  id: number,
): Promise<SeriesResponse | undefined> => {
  try {
    const { data } = await axios.get<SeriesResponse>(
      `${baseUrl}v1.4/season?movieId=${id}&sortField=number&sortType=1`,
      {
        headers: {
          "X-API-KEY": API_TOKEN,
        },
      },
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getCastByMovieId = async (
  id: number,
): Promise<ReviewsResponse | undefined> => {
  try {
    const { data } = await axios.get<ReviewsResponse>(
      `${baseUrl}v1.4/person?selectFields=name&selectFields=profession&movies.id=${id}`,
      {
        headers: {
          "X-API-KEY": API_TOKEN,
        },
      },
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getCountries = async () => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/v1/movie/possible-values-by-field?field=countries.name`,
      {
        headers: {
          "X-API-KEY": API_TOKEN,
        },
      },
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
