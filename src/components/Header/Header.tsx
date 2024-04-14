import { Link, useLocation } from "react-router-dom";
import Cap from "../../assets/images/cap.svg";
import cls from "./Header.module.scss";

const Header = () => {
  const location = useLocation();
  return (
    <header className={cls.header}>
      {location.pathname !== "/" && (
        <Link className={cls.link} to="/">
          <h1 className={cls.headerLogo}>Поиск в Кинопоиске</h1>
        </Link>
      )}
      <div className={cls.linksBlock} />
      <div className={cls.shapkaWrapper}>
        {location.pathname === "/" && (
          <>
            <p className={cls.shapka}>Шапка</p>
            <img src={Cap} alt="Cap" className={cls.cap} />
          </>
        )}
      </div>
      <ul className={cls.linksBlock}>
        <li>
          <Link className={cls.authLink} to="/signin">
            Войти
          </Link>
        </li>
        <li>
          <Link className={cls.authLink} to="/movies/random">
            Случайный фильм
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
