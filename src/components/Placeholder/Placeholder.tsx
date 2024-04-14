import cls from "./Placeholder.module.scss";

interface PlaceholderProps {
  text: string;
}

const Placeholder = ({ text }: PlaceholderProps) => {
  return (
    <div className={cls.placeholder}>
      <p className={cls.placeholderText}>{text}</p>
    </div>
  );
};

export default Placeholder;
