import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import ReactStars from "react-rating-stars-component";
import axios from "axios";

export default function AllBooks() {
  const [view, setView] = useState("card");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:5000/books");
        setBooks(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <Helmet>
        <title>All Books | BookNest</title>
      </Helmet>
      <section className="mx-auto w-11/12 max-w-screen-xl py-8">
        <h1 className="mb-8 flex items-center justify-center rounded-lg border bg-blue-500 p-4 text-2xl font-semibold text-white">
          All Books
        </h1>
        <section className="mb-4 flex items-center justify-between">
          <button
            onClick={() => setBooks(books.filter((book) => book?.quantity > 0))}
            className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-600"
          >
            Show Available Books
          </button>
          <select
            onChange={(e) => setView(e.target.value)}
            name="view"
            id="view"
            className="rounded-lg border px-4 py-2 font-semibold"
          >
            <option value="card">Card View</option>
            <option value="table">Table View</option>
          </select>
        </section>
        {loading ? (
          <p className="text-center font-semibold">Loading...</p>
        ) : (
          <>
            {view === "card" && (
              <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {books.map((book) => (
                  <div
                    key={book?.id}
                    className="flex flex-col gap-4 rounded-xl border p-4 shadow"
                  >
                    <img
                      src={book?.image}
                      className="aspect-video w-full rounded-md object-contain"
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

                    <div className="rounded-lg bg-blue-50 p-4">
                      <p className="">
                        <span className="font-semibold">Quantity:</span>{" "}
                        {book?.quantity}
                      </p>
                      <div className="flex items-center gap-4">
                        <p className="font-semibold">Rating:</p>
                        <ReactStars
                          count={5}
                          value={book?.rating}
                          isHalf={true}
                          size={24}
                          edit={false}
                        />
                        <span className="text-sm">{book?.rating}/5</span>
                      </div>
                    </div>

                    <button className="w-full rounded-lg bg-blue-500 px-4 py-1.5 font-semibold text-white transition-colors hover:bg-blue-600">
                      Update
                    </button>
                  </div>
                ))}
              </section>
            )}

            {view === "table" && (
              <section className="overflow-x-auto">
                <table className="w-full max-w-screen-xl border-collapse">
                  <thead className="bg-blue-50 text-center">
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
                  <tbody className="bg-white">
                    {books.map((book) => (
                      <tr
                        key={book?.id}
                        className="border-b border-gray-200 text-center md:table-row"
                      >
                        <td className="px-4 py-2">
                          <img
                            src={book?.image}
                            className="w-8 rounded-md object-contain"
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
                          <button className="rounded-lg bg-blue-500 px-4 py-1.5 font-semibold text-white transition-colors hover:bg-blue-600">
                            Update
                          </button>
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
