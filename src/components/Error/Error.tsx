import { ReloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import cls from "./Error.module.scss";

interface ErrorProps {
  refreshQuery: () => void;
}

const Error = ({ refreshQuery }: ErrorProps) => {
  return (
    <Button onClick={refreshQuery} className={cls.error}>
      <p className={cls.errorText}>Упс, ошибочка вышла!</p>
      <p className={cls.errorText}>Нажмите на кнопку для обновления</p>
      <ReloadOutlined className={cls.errorIcon} spin={true} />
    </Button>
  );
};

export default Error;
