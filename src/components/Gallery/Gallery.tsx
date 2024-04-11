import "swiper/css";
import "./styles.css";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ImagesResponse } from "../../api/types.api";
import cls from "./Gallery.module.scss";

interface GalleryProps {
  images: ImagesResponse | undefined;
}

const Gallery = ({ images }: GalleryProps) => {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {images?.docs?.map((image) => (
          <li key={image.id}>
            <SwiperSlide>
              <img className={cls.galleryImage} src={image.url} alt="" />
            </SwiperSlide>
          </li>
        ))}
      </Swiper>
    </>
  );
};

export default Gallery;
