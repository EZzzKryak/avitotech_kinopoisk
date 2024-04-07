import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Pagination, Select, Space } from "antd";
import { ChangeEvent, useState } from "react";
import { getMovies } from "../../api/kinopoisk.api";
import cls from "./HomePage.module.scss";

const HomePage = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchValue, setSearchValue] = useState<string>("");
  const [ageRating, setAgeRating] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const {
    isPending,
    isError,
    error,
    data: movies,
    isFetching,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["movies", limit, page, ageRating, country, year],
    queryFn: () =>
      getMovies({ limit, page, ageRating, country, year, name: searchValue }),
    placeholderData: keepPreviousData,
  });

  // Срабатывает при каждои изменении searchValue
  // const { data: moviesByName } = useQuery({
  //   queryKey: ["moviesByName", limit, page, ageRating, country, year],
  //   queryFn: () => getMoviesByName({ limit, page, name: searchValue }),
  // });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const selectPage = (page: number, pageSize: number) => {
    setPage(page);
    setLimit(pageSize);
  };

  return (
    <main className={cls.main}>
      <div className={cls.content}>
        <section className={cls.filmsContent}>
          <h1 className={cls.title}>Поиск по Кинопоиску</h1>
          <ul className={cls.filmsList}>
            {movies?.docs.map((movie) => (
              <li className={cls.filmItem} key={movie.id}>
                <img
                  className={cls.filmImage}
                  src={movie.poster.previewUrl}
                  alt=""
                />
                <div className={cls.filmDescription}>
                  <h3 className={cls.filmTitle}>{movie.name}</h3>
                  <p className={cls.filmAgeRating}>
                    Возрастной рейтинг: {movie.ageRating}
                  </p>
                  <p className={cls.filmYear}>Год: {movie.year}</p>
                  <p className={cls.filmCountry}>
                    Страна: {movie.countries[0].name}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <aside className={cls.filters}>
          <form action="">
            <input
              className={cls.searchInput}
              type="text"
              placeholder="Поиск"
              value={searchValue}
              onChange={handleChange}
            />
          </form>
          <button>Поиск</button>
          <Space wrap>
            <Select
              onChange={(value) => setYear(value)}
              defaultValue="Все годы"
              style={{ width: 250 }}
              options={[
                { value: "", label: "Все годы" },
                { value: "2024", label: "2024" },
                { value: "2023", label: "2023" },
                { value: "2022", label: "2022" },
                { value: "2021", label: "2021" },
                { value: "2020", label: "2020" },
                { value: "2010-2019", label: "2010-2019" },
                { value: "2000-2009", label: "2000-2009" },
              ]}
            />
            <Select
              onChange={(value) => setCountry(value)}
              defaultValue="Все страны"
              style={{ width: 250 }}
              options={[
                { value: "", label: "Все страны" },
                { value: "Россия", label: "Россия" },
                { value: "США", label: "США" },
                { value: "СССР", label: "СССР" },
                { value: "Франция", label: "Франция" },
                { value: "Италия", label: "Италия" },
              ]}
            />
            <Select
              onChange={(value) => setAgeRating(value)}
              defaultValue="Для всей семьи"
              style={{ width: 250 }}
              options={[
                { value: "", label: "Для всей семьи" },
                { value: "6-18", label: "6+" },
                { value: "12-18", label: "12+" },
                { value: "18", label: "18+" },
              ]}
            />
          </Space>
        </aside>
      </div>
      <Pagination
        className={cls.pagination}
        onChange={selectPage}
        total={movies?.pages}
      />
    </main>
  );
};

export default HomePage;
