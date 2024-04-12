import "swiper/css";
import "./styles.css";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ImagesResponse } from "../../api/types.api";
import cls from "./Gallery.module.scss";
import Placeholder from "./../Placeholder/Placeholder";
import { text } from "stream/consumers";

interface GalleryProps {
  images: ImagesResponse | undefined;
}

const Gallery = ({ images }: GalleryProps) => {
  return (
    <>
      {images?.docs.length ? (
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {images?.docs?.map((image) => (
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
