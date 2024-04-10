export interface Rating {
  filmCritics: number;
  imdb: number;
  kp: number;
  russianFilmCritics: number;
}
export interface Movie {
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
  backdrop: {
    previewUrl: string;
    url: string;
  };
  isSeries: boolean;
}
export interface MoviesResponse {
  docs: Movie[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}

export interface Image {
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

export interface Serie {
  id: string;
  name: string;
  number: number;
  movieId: number;
  episodes: {
    name: string;
    number: number;
  }[];
}
export interface SeriesResponse {
  docs: Serie[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}

export interface Review {
  id: number;
  author: string;
  text: string;
  date: string;
  movieId: number;
  review: string;
  title: string;
  type: "Позитивный" | "Нейтральный" | "Негативный";
}
export interface ReviewsResponse {
  docs: Review[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}
