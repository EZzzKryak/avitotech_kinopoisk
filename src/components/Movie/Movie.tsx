import { Link } from "react-router-dom";
import { Movie as IMovie } from "../../api/types.api";
import cls from "./Movie.module.scss";

interface MovieProps {
  movie: IMovie;
}

const Movie = ({ movie }: MovieProps) => {
  return (
    <li>
      <Link className={cls.movieItem} to={`movies/${movie.id}`}>
        <img
          className={cls.movieImage}
          src={movie.poster?.previewUrl}
          alt="Постер фильма"
        />
        <div className={cls.movieDescription}>
          <h3 className={cls.movieTitle}>{movie.name}</h3>
          <p className={cls.movieAgeRating}>
            Возрастной рейтинг:&nbsp;{movie.ageRating}
          </p>
          <p className={cls.movieYear}>Год:&nbsp;{movie.year}</p>
          <ul className={cls.movieCountries}>
            <li>Страна:&nbsp;</li>
            {movie.countries.length
              ? movie.countries.map((country, i) => (
                  <li className={cls.country} key={movie.id + i}>
                    {country.name}
                  </li>
                ))
              : "Страна неизвестна"}
          </ul>
        </div>
      </Link>
    </li>
  );
};

export default Movie;
