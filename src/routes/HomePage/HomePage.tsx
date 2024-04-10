import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, Pagination, Select } from "antd";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { getMoviesByFilters, getMoviesByName } from "../../api/kinopoisk.api";
import cls from "./HomePage.module.scss";
import useDebounce from "../../hooks/useDebounce";

const HomePage = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [ageRating, setAgeRating] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const [form] = Form.useForm();

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
      getMoviesByFilters({
        limit,
        page,
        ageRating,
        country,
        year,
      }),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false, // Погуглить про свойство
  });

  const { data: moviesByName } = useQuery({
    queryKey: ["moviesByName", limit, page, debouncedSearchValue],
    queryFn: () => getMoviesByName({ limit, page, name: debouncedSearchValue }),
    placeholderData: keepPreviousData,
    // Запросы уходят только в случае заполненной строки поиска
    enabled: !!debouncedSearchValue,
    refetchOnWindowFocus: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setPage(1);
  };
  const selectPage = (page: number, pageSize: number) => {
    setPage(page);
    setLimit(pageSize);
  };

  const resetSearch = () => {
    resetFilters();
    setSearchValue("");
    setPage(1);
  };

  const resetFilters = () => {
    setAgeRating("");
    setCountry("");
    setYear("");
  };

  return (
    <section className={cls.mainSection}>
      <div className={cls.headSearch}>
        <h1 className={cls.title}>Поиск в Кинопоиске</h1>
        <Form action="">
          <Input
            className={cls.searchInput}
            type="text"
            placeholder="Поиск по всем фильмам"
            value={searchValue}
            onChange={handleChange}
          />
        </Form>
      </div>
      <div className={cls.filmsWrapper}>
        <ul className={cls.filmsList}>
          {(searchValue ? moviesByName : movies)?.docs.map((movie) => (
            <li key={movie.id}>
              <Link className={cls.filmItem} to={`movies/${movie.id}`}>
                <img
                  className={cls.filmImage}
                  src={movie.poster?.previewUrl}
                  alt="Постер фильма"
                />
                <div className={cls.filmDescription}>
                  <h3 className={cls.filmTitle}>{movie.name}</h3>
                  <p className={cls.filmAgeRating}>
                    Возрастной рейтинг: {movie.ageRating}
                  </p>
                  <p className={cls.filmYear}>Год: {movie.year}</p>
                  <p className={cls.filmCountry}>
                    Страна:{" "}
                    {movie.countries.length
                      ? movie.countries[0].name
                      : "Страна неизвестна"}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <aside className={cls.filters}>
          <h3>Фильтры</h3>
          <Form form={form} action="">
            <Form.Item key="moviesFilter">
              <Select
                value={year}
                onChange={(value) => {
                  setYear(value);
                  setSearchValue("");
                  setPage(1);
                }}
                defaultValue=""
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
            </Form.Item>
            <Form.Item>
              <Select
                value={country}
                onChange={(value) => {
                  setCountry(value);
                  setSearchValue("");
                  setPage(1);
                }}
                defaultValue=""
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
            </Form.Item>
            <Form.Item>
              <Select
                value={ageRating}
                onChange={(value) => {
                  setAgeRating(value);
                  setSearchValue("");
                  setPage(1);
                }}
                defaultValue=""
                style={{ width: 250 }}
                options={[
                  { value: "", label: "Для всей семьи" },
                  { value: "6-18", label: "6+" },
                  { value: "12-18", label: "12+" },
                  { value: "18", label: "18+" },
                ]}
              />
            </Form.Item>
          </Form>
          <Button onClick={resetSearch}>Сбросить фильтры</Button>
        </aside>
      </div>
      <Pagination
        className={cls.pagination}
        onChange={selectPage}
        total={(searchValue ? moviesByName : movies)?.pages}
        current={page}
      />
    </section>
  );
};

export default HomePage;
