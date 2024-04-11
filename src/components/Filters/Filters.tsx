import { useState } from "react";
import { ageRatingFilter, countryFilter, yearFilter } from "../../utils/utils";
import { Button, Form, Select } from "antd";

interface FiltersProps {
  handleSetSearchValue: (value: string) => void;
  handleSetPage: (value: number) => void;
}

const Filters = ({ handleSetSearchValue, handleSetPage }: FiltersProps) => {
  const [form] = Form.useForm();
  const [ageRating, setAgeRating] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const resetFilters = () => {
    setAgeRating("");
    setCountry("");
    setYear("");
    handleSetPage(1);
  };

  return (
    <>
      <h3>Фильтры</h3>
      <Form form={form} action="">
        <Form.Item key="moviesFilter">
          <Select
            value={year}
            onChange={(value) => {
              setYear(value);
              handleSetSearchValue("");
              handleSetPage(1);
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
              handleSetSearchValue("");
              handleSetPage(1);
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
              handleSetSearchValue("");
              handleSetPage(1);
            }}
            defaultValue=""
            style={{ width: 250 }}
            options={ageRatingFilter}
          />
        </Form.Item>
      </Form>
      <Button onClick={resetFilters}>Сбросить фильтры</Button>
    </>
  );
};

export default Filters;
