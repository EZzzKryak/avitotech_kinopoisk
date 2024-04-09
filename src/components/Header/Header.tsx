import { Link } from "react-router-dom";
import cls from "./Header.module.scss";

const Header = () => {
  return (
    <header className={cls.header}>
      <h2 className={cls.headerLogo}>testovoe avito.tech</h2>
      <ul className={cls.links}>
        <li>
          <Link className={cls.link} to="/">
            Главная
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
