import { Skeleton } from "antd";
import cls from "./SkeletonMovieCard.module.scss";
const SkeletonMovieCard = () => {
  return (
    <div className={cls.skeletonMovieCard}>
      <Skeleton.Image active />
      <Skeleton active />
    </div>
  );
};

export default SkeletonMovieCard;
