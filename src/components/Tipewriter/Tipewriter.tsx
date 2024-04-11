import { Typewriter } from "react-simple-typewriter";

const Writer = () => {
  return (
    <div className="App">
      <Typewriter
        words={["Кинопоиск", "Поиск в Кинопоиске"]}
        cursor
        cursorStyle="_"
        typeSpeed={150}
        delaySpeed={1500}
        loop={1}
      />
    </div>
  );
};
export default Writer;
