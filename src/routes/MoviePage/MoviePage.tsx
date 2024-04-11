import { useQuery } from "@tanstack/react-query";
import { Button, Tabs, TabsProps } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getImagesByMovieId,
  getMovieById,
  getSeriesByMovieId,
} from "../../api/kinopoisk.api";
import Awards from "../../components/Awards/Awards";
import Gallery from "../../components/Gallery/Gallery";
import MainCast from "../../components/MainCast/MainCast";
import Reviews from "../../components/Reviews/Reviews";
import SeriesMenu from "../../components/SeriesMenu/SeriesMenu";
import SimilarMovies from "../../components/SimilarMovies/SimilarMovies";
import cls from "./MoviePage.module.scss";

const MoviePage = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [isHidden, setIsHidden] = useState<boolean>(true);

  // Movie Query
  const { data } = useQuery({
    queryKey: ["movie"],
    queryFn: () => getMovieById(Number(movieId)),
    refetchOnWindowFocus: false,
  });
  // Images Query
  const { data: movieImages } = useQuery({
    queryKey: ["image"],
    queryFn: () => getImagesByMovieId(Number(movieId)),
    refetchOnWindowFocus: false,
  });
  // Series Query
  const { data: movieSeries } = useQuery({
    queryKey: ["series"],
    queryFn: () => getSeriesByMovieId(Number(movieId)),
    // Не работает
    enabled: !!data?.isSeries,
    refetchOnWindowFocus: false,
  });

  // Табы
  const tabsItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Сезоны и серии",
      children: data?.isSeries ? (
        <SeriesMenu series={movieSeries} />
      ) : (
        <div className={cls.noSeries}>
          Это не сериал, можете ознакомиться с похожими фильмами ниже.
        </div>
      ),
    },
    {
      key: "2",
      label: "Галерея",
      children: <Gallery images={movieImages} />,
    },
    {
      key: "3",
      label: "Отзывы",
      children: <Reviews movieId={movieId} />,
    },
  ];

  const HideDescription = () => {
    setIsHidden((prev) => !prev);
  };
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="movieSection" className={cls.movie}>
      <div className={cls.movieContent}>
        <div className={cls.leftColumn}>
          <div className={cls.stickyBlock}>
            <img className={cls.poster} src={data?.poster.url} alt="" />
            {data?.rating.kp ? (
              <div>Кинопоиск: {data?.rating.kp?.toFixed(1)}</div>
            ) : null}
            {data?.rating.imdb ? (
              <div>IMBD: {data?.rating.imdb?.toFixed(1)}</div>
            ) : null}
          </div>
          <Button
            onClick={() => scrollToSection("movieSection")}
            className={cls.upBtn}
          >
            Наверх
          </Button>
        </div>
        <div className={cls.rightColumn}>
          <Button className={cls.backBtn} onClick={() => navigate(-1)}>
            Назад
          </Button>
          <h2 className={cls.movieTitle}>
            {data?.name} ({data?.year})
          </h2>
          <div className={cls.descriptionContainer}>
            <p
              className={`${cls.description} ${isHidden ? cls.hiddenElement : ""}`}
            >
              {data?.description}
            </p>
          </div>
          <Button onClick={HideDescription}>
            {isHidden ? "Показать" : "Скрыть"}
          </Button>
          <MainCast cast={data?.persons} />
          <Awards />
          <Tabs
            tabBarGutter={5}
            type="card"
            size="large"
            defaultActiveKey="1"
            items={tabsItems}
          />
        </div>
      </div>
      <SimilarMovies similarMovies={data?.similarMovies} />
      {/* <Button onClick={() => navigate(-1)}>Назад</Button> */}
    </section>
  );
};

export default MoviePage;
