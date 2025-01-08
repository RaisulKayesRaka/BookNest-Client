import { useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

export default function BookDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "https://booknest-server-brown.vercel.app/book/" + id + "?email=" + user?.email,
          {
            withCredentials: true,
          },
        );
        setBook(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, user?.email]);

  const handleBorrowSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const returnDate = form.returnDate.value;
    const borrowerName = form.borrowerName.value;
    const borrowerEmail = form.borrowerEmail.value;

    const borrowDetails = {
      bookId: book?._id,
      borrowerEmail,
      borrowerName,
      borrowDate: new Date().toISOString().split("T")[0],
      returnDate,
    };

    try {
      const response = await axios.post(
        "https://booknest-server-brown.vercel.app/borrow-book",
        borrowDetails,
        {
          withCredentials: true,
        },
      );
      if (response.data?.message) {
        return toast.error(response.data?.message);
      }
      if (response.data?.insertedId) {
        toast.success("Book borrowed successfully");

        setBook((prevBook) => ({
          ...prevBook,
          quantity: prevBook?.quantity - 1,
          isBorrowed: true,
        }));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to borrow book. Please try again.");
    } finally {
      document.getElementById("borrow_modal").close();
      form.reset();
    }
  };

  return (
    <>
      <Helmet>
        <title>Book Details | BookNest</title>
      </Helmet>
      <section className="mx-auto w-11/12 max-w-screen-xl py-8">
        <h1 className="mb-8 flex items-center justify-center rounded-lg border bg-blue-500 p-4 text-2xl font-semibold text-white">
          Book Details
        </h1>

        {loading ? (
          <Loading />
        ) : (
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-blue-50 p-4">
              <img
                src={book?.image}
                alt={book?.name}
                className="w-full max-w-64 rounded-lg"
              />
            </div>
            <div className="sm:col-span-1 md:col-span-2">
              <h2 className="text-2xl font-semibold">{book?.name}</h2>
              <p className="mb-4">{book?.authorName}</p>
              <p className="mb-4 inline-block rounded-lg bg-blue-100 px-4 py-1 text-center text-sm font-semibold text-blue-600">
                {book?.category}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Quantity:</span>{" "}
                {book?.quantity}
              </p>

              <div className="mb-3 flex items-center gap-4">
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
              <div className="mb-4 rounded-lg bg-blue-50 p-4">
                <p className="mb-2 font-semibold">Short Description:</p>
                <p>{book?.shortDescription}</p>
              </div>
              <div className="mb-4 rounded-lg bg-blue-50 p-4">
                <p className="mb-2 font-semibold">Book Content:</p>
                <p>{book?.bookContent}</p>
              </div>
              {!book?.isBorrowed ? (
                <button
                  onClick={() =>
                    document.getElementById("borrow_modal").showModal()
                  }
                  className={`w-full rounded-lg px-4 py-2 font-semibold text-white ${
                    book?.quantity === 0
                      ? "cursor-not-allowed bg-gray-400 opacity-50"
                      : "bg-blue-500"
                  }`}
                  disabled={book?.quantity === 0}
                >
                  Borrow this book
                </button>
              ) : (
                <button
                  className={`w-full cursor-not-allowed rounded-lg bg-gray-400 px-4 py-2 font-semibold text-white opacity-50`}
                  disabled
                >
                  Borrowed
                </button>
              )}
            </div>
          </section>
        )}
        <dialog id="borrow_modal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                ✕
              </button>
            </form>
            <form onSubmit={handleBorrowSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label
                    htmlFor="borrowerName"
                    className="mb-2 block font-semibold"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="borrowerName"
                    name="borrowerName"
                    defaultValue={user?.displayName}
                    className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="borrowerEmail"
                    className="mb-2 block font-semibold"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="borrowerEmail"
                    name="borrowerEmail"
                    defaultValue={user?.email}
                    className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                    required
                    disabled
                  />
                </div>

                <div>
                  <label
                    htmlFor="returnDate"
                    className="mb-2 block font-semibold"
                  >
                    Return Date
                  </label>
                  <input
                    type="date"
                    id="returnDate"
                    name="returnDate"
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white"
                  >
                    Borrow
                  </button>
                </div>
              </div>
            </form>
          </div>
        </dialog>
      </section>
    </>
  );
}
