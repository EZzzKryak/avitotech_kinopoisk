import { Button, ConfigProvider } from "antd";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import { mainTheme } from "../../config/theme.config";
import cls from "./NotFoundPage.module.scss";

export default function NotFoundPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      // ...
    } else if (error.status === 404) {
      // ...
    }

    return (
      <div className={cls.errorPage}>
        <h1>Упс! Ошибка {error.status}</h1>
        <p>Описание ошибки: {error.statusText}</p>
        {error.data?.message && (
          <p>
            <i>{error.data.message}</i>
          </p>
        )}
        <ConfigProvider theme={mainTheme}>
          <Button onClick={() => navigate(-1)}>Назад</Button>
        </ConfigProvider>
      </div>
    );
  }
}
