import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

export default function BorrowedBooks() {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "https://booknest-server-brown.vercel.app/borrowed-books?email=" +
            user?.email,
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
  }, [user?.email]);

  const handleReturnBook = async (bookId) => {
    try {
      const response = await axios.patch(
        "https://booknest-server-brown.vercel.app/return-book/" + bookId,
        {
          email: user?.email,
        },
        {
          withCredentials: true,
        },
      );

      if (response.data?.message) {
        toast.error(response.data?.message);
        return;
      }

      if (response.data?.deletedCount === 1) {
        toast.success("Book returned successfully");
        setBooks(books.filter((book) => book._id !== bookId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Borrowed Books | BookNest</title>
      </Helmet>
      <section className="mx-auto w-11/12 max-w-screen-xl py-8">
        <h1 className="mb-8 flex items-center justify-center rounded-lg bg-blue-500 p-4 text-2xl font-semibold text-white">
          Borrowed Books
        </h1>
        {loading ? (
          <Loading />
        ) : (
          <>
            {books.length > 0 ? (
              <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {books.map((book) => (
                  <div
                    key={book?._id}
                    className="flex flex-col gap-4 rounded-lg border p-4 shadow dark:border-gray-700"
                  >
                    <img
                      src={book?.image}
                      className="aspect-video w-full rounded-lg object-contain"
                      alt="Book Cover"
                    />
                    <p className="rounded-lg bg-blue-100 px-4 py-1 text-center text-sm font-semibold text-blue-600">
                      {book?.category}
                    </p>
                    <div className="flex-1">
                      <h3 className="text-center font-bold transition-colors">
                        {book?.name}
                      </h3>
                    </div>

                    <div className="space-y-1 rounded-lg bg-blue-50 p-4 dark:bg-gray-900">
                      <p className="">
                        <span className="font-semibold">Borrowed Date:</span>{" "}
                        {book?.borrowDate}
                      </p>
                      <p className="">
                        <span className="font-semibold">Return Date:</span>{" "}
                        {book?.returnDate}
                      </p>
                    </div>

                    <button
                      onClick={() => handleReturnBook(book?._id)}
                      className="w-full rounded-lg bg-blue-500 px-4 py-1.5 font-semibold text-white transition-colors hover:bg-blue-600"
                    >
                      Return
                    </button>
                  </div>
                ))}
              </section>
            ) : (
              <h2 className="text-center text-gray-400">
                You currently have no books borrowed.
              </h2>
            )}
          </>
        )}
      </section>
    </>
  );
}
