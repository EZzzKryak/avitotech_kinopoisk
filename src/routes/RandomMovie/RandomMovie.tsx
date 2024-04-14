import { useQuery } from "@tanstack/react-query";
import { Button, Form, Select } from "antd";
import { useState } from "react";
import { getRandomMovieByFilters } from "../../api/kinopoisk.api";
import Error from "../../components/Error/Error";
import Movie from "../../components/Movie/Movie";
import {
  countryFilter,
  genreFilter,
  isSeriesFilter,
  studioFilter,
  yearFilter,
} from "../../utils/utils";
import cls from "./RandomMovie.module.scss";

const RandomMovie = () => {
  const [form] = Form.useForm();

  const [genre, setGenre] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [year, setYear] = useState<string>();
  const [isSeries, setIsSeries] = useState<string>();
  const [studio, setStudio] = useState<string>();

  const {
    data,
    isFetching,
    refetch,
    error: movieError,
  } = useQuery({
    queryKey: ["random"],
    queryFn: () =>
      getRandomMovieByFilters({
        genre,
        country,
        year,
        isSeries,
        studio,
      }),
    refetchOnWindowFocus: false,
  });

  if (movieError) {
    return <Error refreshQuery={() => refetch()} />;
  }

  return (
    <section className={cls.random}>
      <h2>Случайный фильм</h2>
      <div className={cls.randomMovie}>
        <div>
          <Movie movie={data} isFetching={isFetching} />
          <Button onClick={() => refetch()} className={cls.randomBtn}>
            Найти другой фильм
          </Button>
        </div>
        <div className={cls.filters}>
          <h3>Фильтры</h3>
          <Form form={form} action="">
            <Form.Item key="moviesFilter">
              <Select
                value={genre}
                onChange={(value) => {
                  setGenre(value);
                }}
                defaultValue=""
                style={{ width: 250 }}
                options={genreFilter}
              />
            </Form.Item>
            <Form.Item>
              <Select
                value={country}
                onChange={(value) => {
                  setCountry(value);
                }}
                defaultValue=""
                style={{ width: 250 }}
                options={countryFilter}
              />
            </Form.Item>
            <Form.Item>
              <Select
                value={isSeries}
                onChange={(value) => {
                  setIsSeries(value);
                }}
                defaultValue=""
                style={{ width: 250 }}
                options={isSeriesFilter}
              />
            </Form.Item>
            <Form.Item key="moviesFilter">
              <Select
                value={year}
                onChange={(value) => {
                  setYear(value);
                }}
                defaultValue=""
                style={{ width: 250 }}
                options={yearFilter}
              />
            </Form.Item>
            <Form.Item>
              <Select
                value={studio}
                onChange={(value) => {
                  setStudio(value);
                }}
                defaultValue=""
                style={{ width: 250 }}
                options={studioFilter}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default RandomMovie;
