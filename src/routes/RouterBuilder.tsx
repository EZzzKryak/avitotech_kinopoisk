import App from "../components/AppLayout/AppLayout";
import HomePage from "./HomePage/HomePage";
import LoginPage from "./LoginPage/LoginPage";
import MoviePage from "./MoviePage/MoviePage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import RandomMovie from "./RandomMovie/RandomMovie";

const RouterBuilder = () => {
  const generalRoutes = [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/movies/:movieId",
      element: <MoviePage />,
    },
    {
      path: "/movies/random",
      element: <RandomMovie />,
    },
  ];

  const routes = [
    {
      element: <App />,
      children: generalRoutes,
      errorElement: <NotFoundPage />,
    },
    {
      path: "signin",
      element: <LoginPage />,
    },
  ];

  return routes;
};

export default RouterBuilder;
