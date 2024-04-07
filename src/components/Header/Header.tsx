import { Link } from "react-router-dom";
import cls from "./Header.module.scss";

const Header = () => {
  return (
    <header className={cls.header}>
      <p>Шапка</p>
      <Link to="/film">Фильм</Link>
      <Link to="/">Главная</Link>
    </header>
  );
};

export default Header;
