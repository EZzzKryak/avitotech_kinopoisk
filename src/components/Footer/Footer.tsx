import Maskot from "../../assets/images/maskot.svg";
import cls from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={cls.footer}>
      <div className={cls.copyright}>
        Made with <div className={cls.heart} />
        by Manitsyn Alexander, {new Date().getFullYear()}
      </div>
      <img src={Maskot} alt="Maskot" className={cls.maskot} />
    </footer>
  );
};

export default Footer;
