import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, Pagination, Select } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import ScrollToTop from "react-scroll-to-top";
import { getMoviesByFilters, getMoviesByName } from "../../api/kinopoisk.api";
import Movie from "../../components/Movie/Movie";
import Writer from "../../components/Tipewriter/Tipewriter";
import useDebounce from "../../hooks/useDebounce";
import { ageRatingFilter, countryFilter, yearFilter } from "../../utils/utils";
import cls from "./HomePage.module.scss";

const HomePage = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [ageRating, setAgeRating] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [form] = Form.useForm();

  useEffect(() => {
    if (localStorage.getItem("year")) {
      const year = JSON.parse(localStorage.getItem("year") || "");
      setYear(year);
    }
    if (localStorage.getItem("country")) {
      const country = JSON.parse(localStorage.getItem("country") || "");
      setCountry(country);
    }
    if (localStorage.getItem("ageRating")) {
      const ageRating = JSON.parse(localStorage.getItem("ageRating") || "");
      setAgeRating(ageRating);
    }
    if (localStorage.getItem("searchValue")) {
      const searchValue = JSON.parse(localStorage.getItem("searchValue") || "");
      setSearchValue(searchValue);
    }
    if (localStorage.getItem("page")) {
      const page = JSON.parse(localStorage.getItem("page") || "");
      setPage(page);
    }
  }, []);

  const {
    isFetching,
    isError,
    error,
    data: moviesByFilters,
  } = useQuery({
    queryKey: ["moviesByFilters", limit, page, ageRating, country, year],
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
    localStorage.setItem("searchValue", JSON.stringify(e.target.value));
    resetStorageFilters();
    resetFilters();
  };
  const selectPage = (page: number, pageSize: number) => {
    setPage(page);
    setLimit(pageSize);
    localStorage.setItem("page", JSON.stringify(page));
  };

  const resetSearchValue = () => {
    setSearchValue("");
    resetFilters();
    resetStorageFilters();
    localStorage.removeItem("searchValue");
  };
  const resetStorageFilters = () => {
    localStorage.removeItem("year");
    localStorage.removeItem("ageRating");
    localStorage.removeItem("country");
    localStorage.removeItem("page");
  };
  const resetFilters = () => {
    setAgeRating("");
    setCountry("");
    setYear("");
    setPage(1);
  };

  return (
    <section className={cls.mainSection}>
      <ScrollToTop top={800} smooth={true} />
      <div className={cls.headSearch}>
        <h1 className={cls.title}>
          <Writer />
        </h1>
        <Form className={cls.searchForm} action="">
          <Input
            className={cls.searchInput}
            type="text"
            placeholder="Введите название фильма или сериала"
            value={searchValue}
            onChange={handleChange}
          />
        </Form>
      </div>
      <div className={cls.filmsWrapper}>
        <ul className={cls.filmsList}>
          {moviesByFilters?.docs.length === 0 && (
            <div className={cls.moviesNotFound}>
              По вашему запросу ничего не найдено
            </div>
          )}
          {moviesByName?.docs.length === 0 && searchValue && (
            <div className={cls.moviesNotFound}>
              По вашему запросу ничего не найдено
            </div>
          )}
          {(searchValue ? moviesByName : moviesByFilters)?.docs.map((movie) => (
            <Movie isFetching={isFetching} key={movie.id} movie={movie} />
          ))}
        </ul>
        <aside className={cls.aside}>
          <div className={cls.filters}>
            <h3>Фильтры</h3>
            <Form form={form} action="">
              <Form.Item key="moviesFilter">
                <Select
                  value={year}
                  onChange={(value) => {
                    setYear(value);
                    localStorage.setItem("year", JSON.stringify(value));
                    setSearchValue("");
                    localStorage.removeItem("searchValue");
                    setPage(1);
                    localStorage.removeItem("page");
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
                    localStorage.setItem("country", JSON.stringify(value));
                    setSearchValue("");
                    localStorage.removeItem("searchValue");
                    setPage(1);
                    localStorage.removeItem("page");
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
                    localStorage.setItem("ageRating", JSON.stringify(value));
                    setSearchValue("");
                    localStorage.removeItem("searchValue");
                    setPage(1);
                    localStorage.removeItem("page");
                  }}
                  defaultValue=""
                  style={{ width: 250 }}
                  options={ageRatingFilter}
                />
              </Form.Item>
            </Form>
            <Button onClick={resetSearchValue}>Сбросить фильтры</Button>
          </div>
        </aside>
      </div>
      <Pagination
        locale={{ items_per_page: " на странице" }}
        className={cls.pagination}
        onChange={selectPage}
        total={(searchValue ? moviesByName : moviesByFilters)?.pages}
        current={page}
      />
    </section>
  );
};

export default HomePage;
