import App from "../components/AppLayout/AppLayout";
import FilmPage from "./FilmPage/FilmPage";
import HomePage from "./HomePage/HomePage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";

const RouterBuilder = () => {
  const generalRoutes = [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/film",
      element: <FilmPage />,
    },
  ];

  const routes = [
    {
      element: <App />,
      children: generalRoutes,
      errorElement: <NotFoundPage />,
    },
  ];

  return routes;
};

export default RouterBuilder;
