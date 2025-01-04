import { FaBookmark } from "react-icons/fa";
import { Link } from "react-router";

export default function Categories() {
  return (
    <section className="mx-auto w-11/12 max-w-screen-xl py-16">
      <section className="space-y-1 text-center">
        <div className="flex items-center justify-center gap-2 text-blue-500">
          <FaBookmark className="text-sm" />
          <h3 className="font-semibold">Explore by Categories</h3>
        </div>

        <h2 className="text-2xl font-semibold">
          Find Books That Match Your Interests
        </h2>
      </section>
      <div className="h-8"></div>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          to="/categories/Science Fiction"
          className="flex flex-col items-center justify-center gap-2 rounded-lg border border-blue-500 p-4"
        >
          <img
            src="../assets/ScienceFiction.png"
            alt=""
            className="h-16 w-16"
          />
          <h3 className="font-semibold">Science Fiction</h3>
        </Link>
        <Link
          to="/categories/Business"
          className="flex flex-col items-center justify-center gap-2 rounded-lg border border-blue-500 p-4"
        >
          <img src="../assets/Business.png" alt="" className="h-16 w-16" />
          <h3 className="font-semibold">Business</h3>
        </Link>
        <Link
          to="/categories/Personal Development"
          className="flex flex-col items-center justify-center gap-2 rounded-lg border border-blue-500 p-4"
        >
          <img
            src="../assets/PersonalDevelopment.png"
            alt=""
            className="h-16 w-16"
          />
          <h3 className="font-semibold">Personal Development</h3>
        </Link>
        <Link
          to="/categories/History"
          className="flex flex-col items-center justify-center gap-2 rounded-lg border border-blue-500 p-4"
        >
          <img src="../assets/History.png" alt="" className="h-16 w-16" />
          <h3 className="font-semibold">History</h3>
        </Link>
      </section>
    </section>
  );
}
