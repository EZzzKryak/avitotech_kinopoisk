import { Link } from "react-router-dom";
import cls from "./Header.module.scss";

const Header = () => {
  return (
    <header className={cls.header}>
      <Link className={cls.link} to="/">
        <h2 className={cls.headerLogo}>Поиск в Кинопоиске</h2>
      </Link>
      <Link className={cls.link} to="/signin">
        Выйти
      </Link>
    </header>
  );
};

export default Header;
