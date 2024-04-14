import axiosInstance from "../config/axiosInstance";
import { selectFields } from "../utils/constants";
import {
  ImagesResponse,
  Movie,
  MoviesResponse,
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
    const { data } = await axiosInstance.get<MoviesResponse>(
      `v1.4/movie?${selectFields}&page=${page}&limit=${limit}${country && "&countries.name=" + country}${year && "&year=" + year}${ageRating && "&ageRating=" + ageRating}`,
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
    const { data } = await axiosInstance.get<MoviesResponse>(
      `v1.4/movie/search?query=${name}&page=${page}&limit=${limit}`,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMovieById = async (id: number): Promise<Movie | undefined> => {
  try {
    const { data } = await axiosInstance.get<Movie>(`v1.4/movie/${id}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getRandomMovieByFilters = async ({
  genre,
  country,
  year,
  isSeries,
  studio,
}: {
  genre?: string;
  country?: string;
  year?: string;
  isSeries?: string;
  studio?: string;
}): Promise<Movie | undefined> => {
  try {
    const { data } = await axiosInstance.get<Movie>(
      `v1.4/movie/random?${country && "&countries.name=" + country}${genre && "&genres.name=" + genre}${year && "&year=" + year}${isSeries && "&isSeries=" + isSeries}${studio && "&networks.items.name=" + studio}`,
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getImagesByMovieId = async (
  id: number,
): Promise<ImagesResponse | undefined> => {
  try {
    const { data } = await axiosInstance.get<ImagesResponse>(
      `v1.4/image?movieId=${id}`,
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getSeriesByMovieId = async (
  id: number,
): Promise<SeriesResponse | undefined> => {
  try {
    const { data } = await axiosInstance.get<SeriesResponse>(
      `v1.4/season?movieId=${id}&sortField=number&sortType=1`,
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

// export const getCastByMovieId = async (
//   id: number
// ): Promise<ReviewsResponse | undefined> => {
//   try {
//     const { data } = await axiosInstance.get<ReviewsResponse>(
//       `v1.4/person?selectFields=name&selectFields=profession&movies.id=${id}`
//     );
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getCountries = async () => {
//   try {
//     const { data } = await axiosInstance.get(
//       `/v1/movie/possible-values-by-field?field=countries.name`
//     );
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };
