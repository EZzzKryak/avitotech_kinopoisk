import { Button } from "antd";
import { Link } from "react-router-dom";
import cls from "./LoginPage.module.scss";

const LoginPage = () => {
  return (
    <div className={cls.login}>
      <h2>Авторизация</h2>
      <Button>
        <Link to="/">Войти</Link>
      </Button>
    </div>
  );
};

export default LoginPage;
