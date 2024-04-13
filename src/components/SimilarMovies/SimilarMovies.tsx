import { Link } from "react-router-dom";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Movie } from "../../api/types.api";
import Placeholder from "../Placeholder/Placeholder";
import cls from "./SimilarMovies.module.scss";
interface SimilarMoviesProps {
  similarMovies: Movie[] | undefined;
}

const SimilarMovies = ({ similarMovies }: SimilarMoviesProps) => {
  return (
    <div className={cls.similarMovies}>
      <h3 className={cls.similarTitle}>Похожие фильмы и сериалы</h3>
      {similarMovies?.length ? (
        <ul className={cls.similarList}>
          <Swiper
            slidesPerView={5}
            spaceBetween={20}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            //   mousewheel={true}
            //   direction={"horizontal"}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {similarMovies?.map((movie) => {
              return (
                <li key={movie.id}>
                  <SwiperSlide key={movie.id}>
                    <Link
                      target="_blank"
                      className={cls.slide}
                      to={`/movies/${movie.id}`}
                    >
                      <img
                        className={cls.similarImage}
                        src={movie.poster.previewUrl}
                        alt={movie.name}
                      />
                      <p className={cls.similarName}>
                        {movie.name} ({movie.year})
                      </p>
                    </Link>
                  </SwiperSlide>
                </li>
              );
            })}
          </Swiper>
        </ul>
      ) : (
        <Placeholder text="Нет информации о похожих фильмах и сериалах" />
      )}
    </div>
  );
};

export default SimilarMovies;
