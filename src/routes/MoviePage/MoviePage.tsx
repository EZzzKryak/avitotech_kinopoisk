import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getImagesByMovieId, getMovieById } from "../../api/kinopoisk.api";
import cls from "./MoviePage.module.scss";
import { Button, Tabs, TabsProps } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./styles.css";
import { Pagination, Mousewheel } from "swiper/modules";
import { useState } from "react";

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

  const images = [
    {
      original: movieImages?.docs[0].url as string,
      thumbnail: movieImages?.docs[0].previewUrl as string,
      originalClass: cls.original,
    },
    {
      original: movieImages?.docs[1].url as string,
      thumbnail: movieImages?.docs[1].previewUrl as string,
      originalClass: cls.original,
    },
    {
      original: movieImages?.docs[2].url as string,
      thumbnail: movieImages?.docs[2].previewUrl as string,
      originalClass: cls.original,
    },
    {
      original: movieImages?.docs[3].url as string,
      thumbnail: movieImages?.docs[3].previewUrl as string,
      originalClass: cls.original,
    },
    {
      original: movieImages?.docs[4].url as string,
      thumbnail: movieImages?.docs[4].previewUrl as string,
      originalClass: cls.original,
    },
    {
      original: movieImages?.docs[5].url as string,
      thumbnail: movieImages?.docs[5].previewUrl as string,
      originalClass: cls.original,
    },
    {
      original: movieImages?.docs[6].url as string,
      thumbnail: movieImages?.docs[6].previewUrl as string,
      originalClass: cls.original,
    },
  ];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Сезоны и серии",
      children: (
        <ul>
          <li>Серия 1</li>
          <li>Серия 1</li>
          <li>Серия 1</li>
          <li>Серия 1</li>
          <li>Серия 1</li>
          <li>Серия 1</li>
          <li>Серия 1</li>
          <li>Серия 1</li>
          <li>Серия 1</li>
          <li>Серия 1</li>
        </ul>
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
      children: (
        <ul>
          <li>Отзыв</li>
          <li>Отзыв</li>
          <li>Отзыв</li>
          <li>Отзыв</li>
          <li>Отзыв</li>
          <li>Отзыв</li>
          <li>Отзыв</li>
        </ul>
      ),
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
        <h3 className={cls.castTitle}>Актерский состав</h3>
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
          items={items}
        />
      </div>

      <button onClick={() => navigate(-1)}>Назад</button>
    </section>
  );
};

export default MoviePage;
