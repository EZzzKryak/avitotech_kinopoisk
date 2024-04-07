import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

export default function NotFoundPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      // ...
    } else if (error.status === 404) {
      // ...
    }

    return (
      <div>
        <h1>Oops! Error {error.status}</h1>
        <p>{error.statusText}</p>
        {error.data?.message && (
          <p>
            <i>{error.data.message}</i>
          </p>
        )}
        <button onClick={() => navigate(-1)}>Назад</button>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Oops! Unexpected Error</h1>
        <p>Something went wrong.</p>
        <p>
          <i>{error.message}</i>
        </p>
        <button onClick={() => navigate(-1)}>Назад</button>
      </div>
    );
  } else {
    return <></>;
  }
}
