import { Helmet } from "react-helmet-async";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  return (
    <>
      <Helmet>
        <title>404 | BookNest</title>
      </Helmet>
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <h3 className="text-xl font-semibold">
          Oops
          <span className="animate-pulse text-3xl font-bold text-red-500">
            !
          </span>
        </h3>
        <img src="../assets/error.png" alt="" />
        <Link
          to="/"
          class="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 focus:scale-95"
        >
          Back to Home
        </Link>
      </div>
    </>
  );
}
