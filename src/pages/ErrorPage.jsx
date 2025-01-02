import { Helmet } from "react-helmet-async";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  return (
    <>
      <Helmet>
        <title>Error | BookNest</title>
      </Helmet>
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <h3 className="text-2xl font-medium">Oops!</h3>
        <h1 className="text-5xl font-bold text-red-500">{error.status}</h1>
        <p className="text-xl font-medium">
          {error.statusText || error.message}
        </p>
        <Link to="/" class="btn btn-sm mt-4 font-bold">
          Back to Home
        </Link>
      </div>
    </>
  );
}
