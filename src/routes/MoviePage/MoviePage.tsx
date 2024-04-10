import { useQuery } from "@tanstack/react-query";
import { Button, Tabs, TabsProps } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import { Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  getImagesByMovieId,
  getMovieById,
  getSeriesByMovieId,
} from "../../api/kinopoisk.api";
import Reviews from "../../components/Reviews/Reviews";
import SeriesMenu from "../../components/SeriesMenu/SeriesMenu";
import cls from "./MoviePage.module.scss";
import "./styles.css";

const MoviePage = () => {
  const [descriptionisHidden, setDescriptionisHidden] = useState<boolean>(true);
  const navigate = useNavigate();
  const { movieId } = useParams();
  const { data } = useQuery({
    queryKey: ["movie"],
    queryFn: () => getMovieById(Number(movieId)),
    refetchOnWindowFocus: false,
  });

  const { data: movieImages } = useQuery({
    queryKey: ["image"],
    queryFn: () => getImagesByMovieId(Number(movieId)),
    refetchOnWindowFocus: false,
  });
  // const { data: cast } = useQuery({
  //   queryKey: ["cast"],
  //   queryFn: () => getCastByMovieId(Number(movieId)),
  //   refetchOnWindowFocus: false,
  // });
  // console.log(cast);

  const { data: series } = useQuery({
    queryKey: ["series"],
    queryFn: () => getSeriesByMovieId(Number(movieId)),
    // Не работает
    enabled: !!data?.isSeries,
    refetchOnWindowFocus: false,
  });

  // Tabs
  const tabsItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Сезоны и серии",
      children: data?.isSeries ? (
        <SeriesMenu series={series} />
      ) : (
        <div>Это не сериал, можете ознакомиться с похожими фильмами ниже</div>
      ),
    },
    {
      key: "2",
      label: "Галерея",
      children: (
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {movieImages?.docs?.map((image) => (
            <li key={image.id}>
              <SwiperSlide>
                <img className={cls.galleryImage} src={image.url} alt="" />
              </SwiperSlide>
            </li>
          ))}
        </Swiper>
      ),
    },
    {
      key: "3",
      label: "Отзывы критиков",
      children: <Reviews movieId={movieId} />,
    },
  ];

  const handleDescriptionHidden = () => {
    setDescriptionisHidden((prev) => !prev);
  };

  return (
    <section className={cls.movie}>
      <div className={cls.leftColumn}>
        <img className={cls.poster} src={data?.poster.url} alt="" />
        <div>Кинопоиск: {data?.rating.kp?.toFixed(1)}</div>
      </div>
      <div className={cls.rightColumn}>
        <h2 className={cls.movieTitle}>
          {data?.name} ({data?.year})
        </h2>
        <div className={cls.descriptionContainer}>
          <p
            className={`${cls.description} ${descriptionisHidden ? cls.hiddenDescription : ""}`}
          >
            {data?.description}
          </p>
        </div>
        <Button onClick={handleDescriptionHidden}>
          {descriptionisHidden ? "Показать" : "Скрыть"}
        </Button>
        <h3 className={cls.castTitle}>В главных ролях</h3>
        <ul className={cls.cast}>
          <Swiper
            slidesPerView={7}
            spaceBetween={15}
            mousewheel={true}
            modules={[Mousewheel]}
            direction={"horizontal"}
            className="mySwiper"
          >
            {data?.persons.map((person) => {
              if (person.profession === "актеры") {
                return (
                  <li key={person.id}>
                    <SwiperSlide>
                      <div className={cls.slide}>
                        <img
                          className={cls.actorPhoto}
                          src={person.photo}
                          alt={person.description}
                        />
                        <p className={cls.actorRole}>{person.description}</p>
                        <p className={cls.actorName}>{person.name}</p>
                      </div>
                    </SwiperSlide>
                  </li>
                );
              }
            })}
          </Swiper>
        </ul>
        <Tabs
          tabBarGutter={5}
          type="card"
          size="large"
          defaultActiveKey="1"
          items={tabsItems}
        />
      </div>
      {/* <Button onClick={() => navigate(-1)}>Назад</Button> */}
    </section>
  );
};

export default MoviePage;
