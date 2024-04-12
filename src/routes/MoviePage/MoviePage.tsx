import { useQuery } from "@tanstack/react-query";
import { Button, Tabs, TabsProps } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getImagesByMovieId,
  getMovieById,
  getSeriesByMovieId,
} from "../../api/kinopoisk.api";
import Gallery from "../../components/Gallery/Gallery";
import MainCast from "../../components/MainCast/MainCast";
import Reviews from "../../components/Reviews/Reviews";
import SeriesMenu from "../../components/SeriesMenu/SeriesMenu";
import SimilarMovies from "../../components/SimilarMovies/SimilarMovies";
import cls from "./MoviePage.module.scss";
import Placeholder from "../../components/Placeholder/Placeholder";
import ScrollToTop from "react-scroll-to-top";
import MonetizationStats from "../../components/MonetizationStats/MonetizationStats";

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
        <Placeholder text="Это не сериал, можете ознакомиться с похожими фильмами ниже" />
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
      <ScrollToTop top={800} smooth={true} />
      <div className={cls.movieContent}>
        <div className={cls.leftColumn}>
          <img className={cls.poster} src={data?.poster.url} alt="" />
          {data?.rating.kp ? (
            <div>Кинопоиск: {data?.rating.kp?.toFixed(1)}</div>
          ) : null}
          {data?.rating.imdb ? (
            <div>IMBD: {data?.rating.imdb?.toFixed(1)}</div>
          ) : null}
        </div>
        <div className={cls.rightColumn}>
          <Button className={cls.backBtn} onClick={() => navigate(-1)}>
            Назад
          </Button>
          <h2 className={cls.movieTitle}>
            {data?.name || data?.enName || "*Имя отсутствует"} ({data?.year})
          </h2>
          {data?.description ? (
            <>
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
            </>
          ) : (
            <Placeholder text="Описание отсутствует" />
          )}

          <MainCast cast={data?.persons} />
          <MonetizationStats budget={data?.budget} fees={data?.fees} />
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
