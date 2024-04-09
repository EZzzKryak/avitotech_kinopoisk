import axios from "axios";
const baseUrl = "https://api.kinopoisk.dev/v1.4/";
const selectFields =
  "selectFields=id&selectFields=ageRating&selectFields=countries&selectFields=name&selectFields=year&selectFields=poster";

export interface Rating {
  filmCritics: number;
  imdb: number;
  kp: number;
  russianFilmCritics: number;
}
interface Movie {
  id: number;
  ageRating: number;
  countries: { name: string }[];
  name: string;
  description: string;
  year: number;
  rating: Rating;
  lists: string[];
  persons: {
    id: number;
    description: string;
    name: string;
    photo: string;
    profession:
      | "актеры"
      | "художники"
      | "композиторы"
      | "режиссеры"
      | "монтажеры"
      | "операторы"
      | "продюсеры"
      | "актеры дубляжа"
      | "редакторы";
  }[];
  poster: {
    previewUrl: string;
    url: string;
  };
}
export interface MoviesResponse {
  docs: Movie[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}
interface Image {
  id: string;
  url: string;
  previewUrl: string;
}
export interface ImagesResponse {
  docs: Image[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}

export const getMoviesByFilters = async ({
  limit = 10,
  page = 1,
  ageRating,
  country,
  year,
}: {
  limit?: number;
  page?: number;
  ageRating: string;
  country: string;
  year: string;
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
  limit = 10,
  page = 1,
  name,
}: {
  limit?: number;
  page?: number;
  name: string;
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
    console.log(data);
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
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// export const getCountries = async (): Promise<
//   { name: string; slug: string }[] | undefined
// > => {
//   try {
//     const { data } = await axios.get(
//       `https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=countries.name`,
//       {
//         headers: {
//           "X-API-KEY": "WF76VQQ-HQB4P5G-JFJH8DF-CRKDP1M",
//         },
//       }
//     );
//     return data[0].concat(data[1]).concat(data[2]);
//   } catch (error) {
//     console.log(error);
//   }
// };
