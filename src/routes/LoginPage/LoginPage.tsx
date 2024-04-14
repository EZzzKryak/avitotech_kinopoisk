import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import cls from "./LoginPage.module.scss";

interface userData {
  username: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<userData>();
  const login = async (userData: userData) => {
    console.log(userData);
    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      navigate("/");
      localStorage.setItem("token", response.data.id);
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={cls.login}>
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit(login)} className={cls.form}>
        <input
          placeholder="Логин"
          type="text"
          {...register("username", { required: true })}
        />
        <input
          placeholder="Пароль"
          type="password"
          {...register("password", { required: true })}
        />
        <button type="submit" className={cls.loginBtn}>
          Войти
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
