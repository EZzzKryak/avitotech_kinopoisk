import App from "../components/AppLayout/AppLayout";
import HomePage from "./HomePage/HomePage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import MoviePage from "./MoviePage/MoviePage";
import LoginPage from "./LoginPage/LoginPage";

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
