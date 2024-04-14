import { Skeleton } from "antd";
import { Link } from "react-router-dom";
import { Movie as IMovie } from "../../api/types.api";
import SkeletonMovieCard from "../SkeletonMovieCard/SkeletonMovieCard";
import cls from "./Movie.module.scss";

interface MovieProps {
  movie: IMovie | undefined;
  isFetching: boolean;
}

const Movie = ({ movie, isFetching }: MovieProps) => {
  return (
    <li className={cls.movie}>
      {isFetching ? (
        <SkeletonMovieCard />
      ) : (
        <Link className={cls.movieItem} to={`movies/${movie?.id}`}>
          <div className={cls.movieImageWrapper}>
            {movie?.poster?.previewUrl ? (
              <img
                className={cls.movieImage}
                src={movie?.poster?.previewUrl}
                alt="Постер фильма"
              />
            ) : (
              <Skeleton.Image />
            )}
          </div>
          <h3 className={cls.movieTitle}>
            {movie?.name || movie?.enName || "*Имя не найдено"}
          </h3>
          <div className={cls.movieDescription}>
            <p className={cls.movieAgeRating}>
              Возрастной рейтинг:&nbsp;
              {movie?.ageRating == 0 ? 0 : movie?.ageRating || "*Не указан"}
            </p>
            <p className={cls.movieYear}>
              Год:&nbsp;{movie?.year || "*Не указан"}
            </p>
            <ul className={cls.movieCountries}>
              <li>Страна:&nbsp;</li>
              {movie?.countries.length
                ? movie?.countries.map((country, i) => (
                    <li className={cls.country} key={movie?.id + i}>
                      {country.name}
                    </li>
                  ))
                : "*Страна неизвестна"}
            </ul>
          </div>
        </Link>
      )}
    </li>
  );
};

export default Movie;
