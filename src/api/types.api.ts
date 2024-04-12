export interface Pagination {
  limit: number;
  page: number;
  pages: number;
  total: number;
}
export enum ReviewStatus {
  POSITIVE = "Позитивный",
  NEYTRAL = "Нейтральный",
  NEGATIVE = "Негативный",
}
export type Professions =
  | "актеры"
  | "художники"
  | "композиторы"
  | "режиссеры"
  | "монтажеры"
  | "операторы"
  | "продюсеры"
  | "актеры дубляжа"
  | "редакторы";
export interface Persons {
  id: number;
  description: string;
  name: string;
  photo: string;
  profession: Professions;
}
export interface Episodes {
  name: string;
  number: number;
}
export interface Rating {
  filmCritics: number;
  imdb: number;
  kp: number;
  russianFilmCritics: number;
}
export interface Poster {
  previewUrl: string;
  url: string;
}
export interface Budget {
  value: number;
  currency: string;
}
export interface Fees {
  world: Budget;
  russia: Budget;
  usa: Budget;
}
export interface Movie {
  id: number;
  ageRating: number;
  similarMovies: Movie[];
  countries: { name: string }[];
  name: string;
  enName: string;
  budget: Budget;
  fees: Fees;
  description: string;
  year: number;
  rating: Rating;
  lists: string[];
  persons: Persons[];
  poster: Poster;
  backdrop: Poster;
  isSeries: boolean;
}
export interface MoviesResponse extends Pagination {
  docs: Movie[];
}
export interface Image extends Poster {
  id: string;
}
export interface ImagesResponse extends Pagination {
  docs: Image[];
}
export interface Serie {
  name: string;
  number: number;
  movieId: number;
  episodes: Episodes[];
}
export interface SeriesResponse extends Pagination {
  docs: Serie[];
}
export interface Review {
  id: number;
  author: string;
  text: string;
  date: string;
  movieId: number;
  review: string;
  title: string;
  type: ReviewStatus;
}
export interface ReviewsResponse extends Pagination {
  docs: Review[];
}
