import axios from "axios";
import { useEffect } from "react";
import Header from "../Header/Header";
import cls from "./App.module.scss";

const App = () => {
  const getMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.kinopoisk.dev/v1.4/movie?limit=50&selectFields=id&selectFields=name`,
        {
          headers: {
            "X-API-KEY": "WF76VQQ-HQB4P5G-JFJH8DF-CRKDP1M",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <Header />
      <h1 className={cls.head}>AvitoTech Test</h1>
      <div>{}</div>
    </>
  );
};

export default App;
