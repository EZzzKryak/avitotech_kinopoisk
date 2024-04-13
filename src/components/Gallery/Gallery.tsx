import { useQuery } from "@tanstack/react-query";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getImagesByMovieId } from "../../api/kinopoisk.api";
import Placeholder from "./../Placeholder/Placeholder";
import cls from "./Gallery.module.scss";

interface GalleryProps {
  movieId: number | undefined;
}

const Gallery = ({ movieId }: GalleryProps) => {
  const { data: movieImages } = useQuery({
    queryKey: ["image"],
    queryFn: () => getImagesByMovieId(Number(movieId)),
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {movieImages?.docs.length ? (
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {movieImages?.docs?.map((image) => (
            <li key={image.id}>
              <SwiperSlide key={image.id}>
                <img className={cls.galleryImage} src={image.url} alt="" />
              </SwiperSlide>
            </li>
          ))}
        </Swiper>
      ) : (
        <Placeholder text="Нет информации о фотографиях и кадрах из фильма" />
      )}
    </>
  );
};

export default Gallery;
