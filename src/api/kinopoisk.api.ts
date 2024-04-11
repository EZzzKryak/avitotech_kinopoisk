import axios from "axios";
import {
  ImagesResponse,
  Movie,
  MoviesResponse,
  ReviewsResponse,
  SeriesResponse,
} from "./types.api";
export const baseUrl = "https://api.kinopoisk.dev/v1.4/";
const selectFields =
  "selectFields=id&selectFields=ageRating&selectFields=countries&selectFields=name&selectFields=year&selectFields=poster";

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
      // `${baseUrl}movie${name && "/search?query=" + name}?page=${page}&limit=${limit}`,
      `${baseUrl}movie?${selectFields}&page=${page}&limit=${limit}${country && "&countries.name=" + country}${year && "&year=" + year}${ageRating && "&ageRating=" + ageRating}`,
      {
        headers: {
          "X-API-KEY": "WF76VQQ-HQB4P5G-JFJH8DF-CRKDP1M",
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
      `${baseUrl}movie/search?query=${name}&page=${page}&limit=${limit}`,
      {
        headers: {
          "X-API-KEY": "WF76VQQ-HQB4P5G-JFJH8DF-CRKDP1M",
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
    const { data } = await axios.get<Movie>(`${baseUrl}movie/${id}`, {
      headers: {
        "X-API-KEY": "WF76VQQ-HQB4P5G-JFJH8DF-CRKDP1M",
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
      `${baseUrl}image?movieId=${id}`,
      {
        headers: {
          "X-API-KEY": "WF76VQQ-HQB4P5G-JFJH8DF-CRKDP1M",
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
      `${baseUrl}season?movieId=${id}&sortField=number&sortType=1`,
      {
        headers: {
          "X-API-KEY": "WF76VQQ-HQB4P5G-JFJH8DF-CRKDP1M",
        },
      },
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getReviewsByMovieId = async (
  id: number,
  page?: number,
): Promise<ReviewsResponse | undefined> => {
  try {
    const { data } = await axios.get<ReviewsResponse>(
      `${baseUrl}review?movieId=&page=${page}&movieId=${id}`,
      {
        headers: {
          "X-API-KEY": "WF76VQQ-HQB4P5G-JFJH8DF-CRKDP1M",
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
      `https://api.kinopoisk.dev/v1.4/person?selectFields=name&selectFields=profession&movies.id=${id}`,
      {
        headers: {
          "X-API-KEY": "WF76VQQ-HQB4P5G-JFJH8DF-CRKDP1M",
        },
      },
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
