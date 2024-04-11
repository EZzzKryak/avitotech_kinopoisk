import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, Pagination, Select } from "antd";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { getMoviesByFilters, getMoviesByName } from "../../api/kinopoisk.api";
import cls from "./HomePage.module.scss";
import useDebounce from "../../hooks/useDebounce";
import Writer from "../../components/Tipewriter/Tipewriter";
import Movie from "../../components/Movie/Movie";
import { ageRatingFilter, countryFilter, yearFilter } from "../../utils/utils";

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
    refetchOnWindowFocus: false,
  });
  const { data: moviesByName } = useQuery({
    queryKey: ["moviesByName", limit, page, debouncedSearchValue],
    queryFn: () => getMoviesByName({ limit, page, name: debouncedSearchValue }),
    placeholderData: keepPreviousData,
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
  };
  const resetFilters = () => {
    setAgeRating("");
    setCountry("");
    setYear("");
    setPage(1);
  };

  return (
    <section className={cls.mainSection}>
      <div className={cls.headSearch}>
        <h1 className={cls.title}>
          <Writer />
        </h1>
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
            <Movie key={movie.id} movie={movie} />
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
                options={yearFilter}
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
                options={countryFilter}
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
                options={ageRatingFilter}
              />
            </Form.Item>
          </Form>
          <Button onClick={resetSearch}>Сбросить фильтры</Button>
        </aside>
      </div>
      <Pagination
        locale={{ items_per_page: " на странице" }}
        className={cls.pagination}
        onChange={selectPage}
        total={(searchValue ? moviesByName : movies)?.pages}
        current={page}
      />
    </section>
  );
};

export default HomePage;
