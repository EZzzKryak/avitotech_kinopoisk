import { useLoaderData, useNavigate, useParams } from "react-router-dom";

const MoviePage = () => {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params.movieId);
  return (
    <div>
      <h2>Страница фильма с ID: {params.movieId}</h2>
      <button onClick={() => navigate(-1)}>Назад</button>
    </div>
  );
};

export default MoviePage;
