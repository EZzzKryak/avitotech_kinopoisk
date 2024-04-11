import { Button } from "antd";
import { useState } from "react";
import cls from "./ReviewDescription.module.scss";

const ReviewDescription = ({ text }: { text: string }) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const HideDescription = () => {
    setIsHidden((prev) => !prev);
  };
  return (
    <>
      <p
        className={`${cls.reviewDescription} ${isHidden ? cls.hiddenElement : ""}`}
      >
        {text}
      </p>
      <Button className={cls.moreBtn} onClick={HideDescription}>
        {isHidden ? "Читать отзыв" : "Скрыть отзыв"}
      </Button>
    </>
  );
};

export default ReviewDescription;
