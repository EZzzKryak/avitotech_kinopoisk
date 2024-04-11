import cls from "./MainCast.module.scss";
import "swiper/css";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Movie, Persons, Professions } from "../../api/types.api";
import "./styles.css";

interface MainCastProps {
  cast: Persons[] | undefined;
}
const MainCast = ({ cast }: MainCastProps) => {
  // Для полного списка
  // const { data: cast } = useQuery({
  //   queryKey: ["cast"],
  //   queryFn: () => getCastByMovieId(Number(movieId)),
  //   refetchOnWindowFocus: false,
  // });
  // console.log(cast);

  return (
    <>
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
          {cast?.map((person) => {
            if (person.profession === "актеры") {
              return (
                <li key={person.id}>
                  <SwiperSlide key={person.id}>
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
    </>
  );
};

export default MainCast;