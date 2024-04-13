import { Skeleton } from "antd";
import "swiper/css";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Persons } from "../../api/types.api";
import Placeholder from "./../Placeholder/Placeholder";
import cls from "./MainCast.module.scss";
import "./styles.css";

interface MainCastProps {
  cast: Persons[] | undefined;
  isFetching: boolean;
}
const MainCast = ({ cast, isFetching }: MainCastProps) => {
  // Для полного списка каста
  // const { data: cast } = useQuery({
  //   queryKey: ["cast"],
  //   queryFn: () => getCastByMovieId(Number(movieId)),
  //   refetchOnWindowFocus: false,
  // });
  // console.log(cast);

  return (
    <>
      <h3 className={cls.castTitle}>В главных ролях</h3>
      {cast?.length ? (
        <ul className={cls.cast}>
          <Swiper
            slidesPerView={6}
            spaceBetween={10}
            mousewheel={true}
            modules={[Mousewheel]}
            direction={"horizontal"}
            className="mySwiper"
          >
            {cast?.map((person) => {
              if (person.profession === "актеры") {
                return (
                  <li key={person.id}>
                    <SwiperSlide key={person.id}>
                      {isFetching ? (
                        <Skeleton.Image active />
                      ) : (
                        <div className={cls.slide}>
                          <img
                            className={cls.actorPhoto}
                            src={person.photo}
                            alt={person.description}
                          />
                          <p className={cls.actorRole}>{person.description}</p>
                          <p className={cls.actorName}>{person.name}</p>
                        </div>
                      )}
                    </SwiperSlide>
                  </li>
                );
              }
            })}
          </Swiper>
        </ul>
      ) : (
        <Placeholder text="Нет информации об актёрском составе" />
      )}
    </>
  );
};

export default MainCast;
