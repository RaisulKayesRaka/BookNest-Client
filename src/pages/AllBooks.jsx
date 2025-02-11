import { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet-async";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import Loading from "../components/Loading";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

export default function AllBooks() {
  const { user } = useContext(AuthContext);
  const [view, setView] = useState("card");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "https://booknest-server-brown.vercel.app/books",
          {
            withCredentials: true,
          },
        );
        setBooks(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleShowAvailableBooks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://booknest-server-brown.vercel.app/available-books",
        {
          withCredentials: true,
        },
      );
      setBooks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (e) => {
    const sortBy = e.target.value;
    const sortedBooks = [...books].sort((a, b) => {
      if (sortBy === "Ascending") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "Descending") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
    setBooks(sortedBooks);
  };

  return (
    <>
      <Helmet>
        <title>All Books | BookNest</title>
      </Helmet>
      <section className="mx-auto w-11/12 max-w-screen-xl py-8">
        <h1 className="mb-8 flex items-center justify-center rounded-lg bg-blue-500 p-4 text-2xl font-semibold text-white">
          All Books
        </h1>
        <section className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={handleShowAvailableBooks}
            className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-600"
          >
            Show Available Books
          </button>
          <select
            onChange={(e) => handleSort(e)}
            name="sort"
            id="sort"
            className="rounded-lg border dark:border-gray-700 dark:bg-black px-4 py-2 font-semibold"
          >
            <option value="">Sort By Name</option>
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
          </select>
          <select
            onChange={(e) => setView(e.target.value)}
            name="view"
            id="view"
            className="rounded-lg border dark:border-gray-700 dark:bg-black px-4 py-2 font-semibold"
          >
            <option value="card">Card View</option>
            <option value="table">Table View</option>
          </select>
        </section>
        {loading ? (
          <Loading />
        ) : (
          <>
            {view === "card" && (
              <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {books.map((book) => (
                  <>
                    <div
                      key={book?._id}
                      className="flex flex-col gap-4 rounded-lg border dark:border-gray-700 p-4 shadow"
                    >
                      <img
                        src={book?.image}
                        className="aspect-video w-full rounded-lg object-contain"
                        alt={`${book?.name} by ${book?.authorName}`}
                      />
                      <p className="rounded-lg bg-blue-100 px-4 py-1 text-center text-sm font-semibold text-blue-600">
                        {book?.category}
                      </p>
                      <div className="flex-1">
                        <h3 className="text-center font-bold transition-colors">
                          {book?.name}
                        </h3>
                        <p className="text-center text-sm italic">
                          {book?.authorName}
                        </p>
                      </div>

                      <div className="rounded-lg bg-blue-50 dark:bg-gray-900 p-4">
                        <p className="">
                          <span className="font-semibold">Quantity:</span>{" "}
                          {book?.quantity}
                        </p>
                        <div className="flex flex-wrap items-center space-x-3">
                          <p className="font-semibold">Rating:</p>
                          <ReactStars
                            key={book?._id}
                            count={5}
                            value={book?.rating}
                            isHalf={true}
                            size={24}
                            edit={false}
                          />
                          <span className="text-sm">{book?.rating}/5</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (book?.email === user?.email) {
                            navigate(`/update-book/${book?._id}`);
                          }
                        }}
                        className={`block w-full rounded-lg px-4 py-1.5 text-center font-semibold text-white transition-colors ${book?.email !== user?.email ? "cursor-not-allowed bg-gray-400 opacity-50" : "bg-blue-500 hover:bg-blue-600"}`}
                        disabled={book?.email !== user?.email}
                      >
                        Update
                      </button>
                    </div>
                  </>
                ))}
              </section>
            )}

            {view === "table" && (
              <section className="overflow-x-auto">
                <table className="w-full max-w-screen-xl border-collapse">
                  <thead className="bg-blue-50 dark:bg-gray-900 text-center">
                    <tr>
                      <th className="px-4 py-2">
                        <span className="font-semibold">Cover</span>
                      </th>
                      <th className="px-4 py-2">
                        <span className="font-semibold">Name</span>
                      </th>
                      <th className="px-4 py-2">
                        <span className="font-semibold">Author</span>
                      </th>
                      <th className="px-4 py-2">
                        <span className="font-semibold">Category</span>
                      </th>
                      <th className="px-4 py-2">
                        <span className="font-semibold">Quantity</span>
                      </th>
                      <th className="px-4 py-2">
                        <span className="font-semibold">Rating</span>
                      </th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {books.map((book) => (
                      <tr
                        key={book?._id}
                        className="border-b border-gray-200 text-center md:table-row"
                      >
                        <td className="px-4 py-2">
                          <img
                            src={book?.image}
                            className="w-8 rounded-lg object-contain"
                            alt="Book Cover"
                          />
                        </td>
                        <td className="px-4 py-2">{book?.name}</td>
                        <td className="whitespace-nowrap px-4 py-2">
                          {book?.authorName}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          <p className="rounded-lg bg-blue-100 px-3 py-1 text-center text-sm font-semibold text-blue-600">
                            {book?.category}
                          </p>
                        </td>
                        <td className="px-4 py-2">{book?.quantity}</td>
                        <td className="px-4 py-2">{book?.rating}/5</td>
                        <td className="px-4 py-2">
                          <Link
                            to={`/update-book/${book?._id}`}
                            className={`block rounded-lg px-4 py-1.5 text-center font-semibold text-white transition-colors ${book?.email !== user?.email ? "cursor-not-allowed bg-gray-400 opacity-50" : "bg-blue-500 hover:bg-blue-600"}`}
                            disabled={book?.email !== user?.email}
                          >
                            Update
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}
          </>
        )}
      </section>
    </>
  );
}
