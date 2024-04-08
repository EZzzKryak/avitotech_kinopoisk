import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../../api/kinopoisk.api";
import cls from "./MoviePage.module.scss";

const MoviePage = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const { data } = useQuery({
    queryKey: ["movie"],
    queryFn: () => getMovieById(Number(movieId)),
    refetchOnWindowFocus: false,
  });

  return (
    <section className={cls.movie}>
      <div className={cls.leftColumn}>
        <img className={cls.poster} src={data?.poster.url} alt="" />
        <div>Кинопоиск: {data?.rating.kp?.toFixed(1)}</div>
      </div>
      <div className={cls.rightColumn}>
        <h2>{data?.name}</h2>
        <p>{data?.description}</p>
        <ul className={cls.cast}>
          {data?.persons.map((person) => {
            if (person.profession === "актеры") {
              return (
                <li key={person.id}>
                  <img
                    className={cls.actorPhoto}
                    src={person.photo}
                    alt={person.description}
                  />
                  <p className={cls.actorDescription}>{person.description}</p>
                  <p className={cls.actorName}>{person.name}</p>
                </li>
              );
            }
          })}
        </ul>
      </div>

      <button onClick={() => navigate(-1)}>Назад</button>
    </section>
  );
};

export default MoviePage;
