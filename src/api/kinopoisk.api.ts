import axios from "axios";
const baseUrl = "https://api.kinopoisk.dev/v1.4/";
const selectFields =
  "selectFields=id&selectFields=ageRating&selectFields=countries&selectFields=name&selectFields=year&selectFields=poster";
interface Movie {
  id: number;
  ageRating: number;
  countries: { name: string }[];
  name: string;
  year: number;
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
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
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

// Получение фильма по клику
const getMovieById = () => {};
