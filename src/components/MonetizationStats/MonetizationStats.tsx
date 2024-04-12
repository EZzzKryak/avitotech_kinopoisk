import { Budget, Fees } from "../../api/types.api";
import cls from "./MonetizationStats.module.scss";

interface MonetizationStatsProps {
  budget: Budget | undefined;
  fees: Fees | undefined;
}

const MonetizationStats = ({ budget, fees }: MonetizationStatsProps) => {
  return (
    <div className={cls.awards}>
      <h3>Бюджет и сборы</h3>
      <p className={cls.title}>
        <span className={cls.feesTitle}>Бюджет: </span>{" "}
        {budget?.value.toLocaleString() || "неизвестно"}
        {budget?.currency || ""}
      </p>
      <ul className={cls.statsList}>
        <li className={cls.statsItem}>
          <span className={cls.feesTitle}>Сборы в мире:</span>{" "}
          {fees?.world?.value.toLocaleString() || "неизвестно"}
          {fees?.world?.currency || ""}
        </li>
        <li className={cls.statsItem}>
          <span className={cls.feesTitle}>Сборы в Америке:</span>{" "}
          {fees?.usa?.value.toLocaleString() || "неизвестно"}
          {fees?.usa?.currency || ""}
        </li>
        <li className={cls.statsItem}>
          <span className={cls.feesTitle}>Сборы в России:</span>{" "}
          {fees?.russia?.value.toLocaleString() || "неизвестно"}
          {fees?.russia?.currency || ""}
        </li>
      </ul>
    </div>
  );
};

export default MonetizationStats;
