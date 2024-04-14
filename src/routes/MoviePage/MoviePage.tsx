import { useQuery } from "@tanstack/react-query";
import type { TabsProps } from "antd";
import { Button, Skeleton, Tabs } from "antd";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import { getMovieById, getSeriesByMovieId } from "../../api/kinopoisk.api";
import Error from "../../components/Error/Error";
import Gallery from "../../components/Gallery/Gallery";
import MainCast from "../../components/MainCast/MainCast";
import MonetizationStats from "../../components/MonetizationStats/MonetizationStats";
import Placeholder from "../../components/Placeholder/Placeholder";
import Reviews from "../../components/Reviews/Reviews";
import SeriesMenu from "../../components/SeriesMenu/SeriesMenu";
import SimilarMovies from "../../components/SimilarMovies/SimilarMovies";
import cls from "./MoviePage.module.scss";

const MoviePage = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const navigate = useNavigate();
  const { movieId } = useParams();
  const id = Number(movieId);
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const {
    data,
    isFetching,
    refetch: refetchMovie,
    error: movieError,
  } = useQuery({
    queryKey: ["movie"],
    queryFn: () => getMovieById(id),
    refetchOnWindowFocus: false,
  });

  const {
    data: movieSeries,
    refetch: refetchSeries,
    error: seriesError,
  } = useQuery({
    queryKey: ["series"],
    queryFn: () => getSeriesByMovieId(id),
    enabled: !!data?.isSeries,
    refetchOnWindowFocus: false,
  });

  const tabsItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Сезоны и серии",
      children: seriesError ? (
        <Error refreshQuery={refetchSeries} />
      ) : (
        <SeriesMenu isSeries={data?.isSeries} series={movieSeries} />
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

  if (movieError) {
    return <Error refreshQuery={refetchMovie} />;
  }

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
          {isFetching ? (
            <Skeleton active />
          ) : (
            <>
              <h2 className={cls.movieTitle}>
                {data?.name || data?.enName || "*Имя отсутствует"} ({data?.year}
                )
              </h2>
              <Button className={cls.backBtn} onClick={() => navigate(-1)}>
                Назад
              </Button>
              {data?.description ? (
                <>
                  <div className={cls.descriptionContainer}>
                    <p
                      className={`${cls.description} ${isHidden ? cls.hiddenElement : ""}`}
                    >
                      {data?.description}
                    </p>
                  </div>
                  <Button className={cls.moreBtn} onClick={HideDescription}>
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
            size={isMobile ? "small" : "large"}
            defaultActiveKey="1"
            items={tabsItems}
          />
        </div>
      </div>
      <SimilarMovies similarMovies={data?.similarMovies} />
    </section>
  );
};

export default MoviePage;
