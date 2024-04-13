import { useQuery } from "@tanstack/react-query";
import { Button, Skeleton, Tabs, TabsProps } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import { getMovieById, getSeriesByMovieId } from "../../api/kinopoisk.api";
import Gallery from "../../components/Gallery/Gallery";
import MainCast from "../../components/MainCast/MainCast";
import MonetizationStats from "../../components/MonetizationStats/MonetizationStats";
import Placeholder from "../../components/Placeholder/Placeholder";
import Reviews from "../../components/Reviews/Reviews";
import SeriesMenu from "../../components/SeriesMenu/SeriesMenu";
import SimilarMovies from "../../components/SimilarMovies/SimilarMovies";
import cls from "./MoviePage.module.scss";

const MoviePage = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const id = Number(movieId);

  const [isHidden, setIsHidden] = useState<boolean>(true);

  // Movie Query
  const { data, isFetching } = useQuery({
    queryKey: ["movie"],
    queryFn: () => getMovieById(id),
    refetchOnWindowFocus: false,
  });
  // Series Query
  const { data: movieSeries } = useQuery({
    queryKey: ["series"],
    queryFn: () => getSeriesByMovieId(id),
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
      children: <Gallery movieId={id} />,
    },
    {
      key: "3",
      label: "Отзывы",
      children: <Reviews movieId={id} />,
    },
  ];

  const HideDescription = () => {
    setIsHidden((prev) => !prev);
  };

  return (
    <section id="movieSection" className={cls.movie}>
      <ScrollToTop top={800} smooth={true} />
      <div className={cls.movieContent}>
        <div className={cls.leftColumn}>
          {isFetching ? (
            <Skeleton.Image active />
          ) : (
            <>
              <img className={cls.poster} src={data?.poster.url} alt="" />
              <div className={cls.ratingWrapper}>
                {data?.rating.kp ? (
                  <p className={cls.rating}>
                    Кинопоиск: {data?.rating.kp?.toFixed(1)}
                  </p>
                ) : null}
                {data?.rating.imdb ? (
                  <p className={cls.rating}>
                    IMBD: {data?.rating.imdb?.toFixed(1)}
                  </p>
                ) : null}
              </div>
            </>
          )}
        </div>
        <div className={cls.rightColumn}>
          <Button className={cls.backBtn} onClick={() => navigate(-1)}>
            Назад
          </Button>
          {isFetching ? (
            <Skeleton active />
          ) : (
            <>
              <h2 className={cls.movieTitle}>
                {data?.name || data?.enName || "*Имя отсутствует"} ({data?.year}
                )
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
            </>
          )}

          <MainCast cast={data?.persons} isFetching={isFetching} />
          {isFetching ? (
            <Skeleton active />
          ) : (
            <MonetizationStats budget={data?.budget} fees={data?.fees} />
          )}
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
