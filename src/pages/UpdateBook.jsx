import { Helmet } from "react-helmet-async";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";

export default function AddBook() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "http://localhost:5000/book/" + id + "?email=" + user?.email,
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

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newBook = {
      email: user?.email,
      image: form.image.value,
      name: form.name.value,
      authorName: form.authorName.value,
      category: form.category.value,
      quantity: parseInt(form.quantity.value),
      rating: parseFloat(form.rating.value),
      shortDescription: form.shortDescription.value,
      bookContent: form.bookContent.value,
    };

    try {
      const { data } = await axios.put(
        "http://localhost:5000/update-book/" + id,
        newBook,
        {
          withCredentials: true,
        },
      );
      if (data.modifiedCount > 0) {
        toast.success("Book updated successfully");
        navigate("/book/" + id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Update Book | BookNest</title>
      </Helmet>
      <>
        {loading ? (
          <Loading />
        ) : (
          <section className="mx-auto w-11/12 max-w-screen-xl py-8">
            <h1 className="mb-8 flex items-center justify-center rounded-lg border bg-blue-500 p-4 text-2xl font-semibold text-white">
              Update Book
            </h1>
            <section className="rounded-lg p-6 shadow">
              <form onSubmit={handleUpdateSubmit}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Image */}
                  <div>
                    <label htmlFor="image" className="mb-2 block font-medium">
                      Image
                    </label>
                    <input
                      type="url"
                      id="image"
                      name="image"
                      placeholder="Enter image URL"
                      defaultValue={book?.image}
                      className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                      required
                    />
                  </div>
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="mb-2 block font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter title of the book"
                      defaultValue={book?.name}
                      className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label
                      htmlFor="category"
                      className="mb-2 block font-medium"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      defaultValue={book?.category}
                      className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                      required
                    >
                      <option value="Science Fiction">Science Fiction</option>
                      <option value="Business">Business</option>
                      <option value="Personal Development">
                        Personal Development
                      </option>
                      <option value="History">History</option>
                    </select>
                  </div>

                  {/* Author Name*/}
                  <div>
                    <label
                      htmlFor="authorName"
                      className="mb-2 block font-medium"
                    >
                      Author Name
                    </label>
                    <input
                      type="text"
                      id="authorName"
                      name="authorName"
                      placeholder="Enter author name"
                      defaultValue={book?.authorName}
                      className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                      required
                    />
                  </div>

                  {/* Quantity */}
                  <div>
                    <label
                      htmlFor="quantity"
                      className="mb-2 block font-medium"
                    >
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      placeholder="Enter quantity"
                      defaultValue={book?.quantity}
                      min={0}
                      className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                      required
                    />
                  </div>
                  {/* Rating */}
                  <div>
                    <label htmlFor="rating" className="mb-2 block font-medium">
                      Rating
                    </label>
                    <input
                      type="number"
                      id="rating"
                      name="rating"
                      placeholder="Enter rating (1-5)"
                      defaultValue={book?.rating}
                      min={1}
                      max={5}
                      step="0.1"
                      className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                      required
                    />
                  </div>

                  {/* Short Description */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="shortDescription"
                      className="mb-2 block font-medium"
                    >
                      Short Description
                    </label>
                    <textarea
                      id="shortDescription"
                      name="shortDescription"
                      rows={3}
                      placeholder="Enter short description"
                      defaultValue={book?.shortDescription}
                      className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                      required
                    />
                  </div>
                  {/* Book Content */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="bookContent"
                      className="mb-2 block font-medium"
                    >
                      Book Content
                    </label>
                    <textarea
                      id="bookContent"
                      name="bookContent"
                      rows={3}
                      placeholder="Enter book content"
                      defaultValue={book?.bookContent}
                      className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-blue-500 py-2 font-bold text-white"
                    >
                      Update Book
                    </button>
                  </div>
                </div>
              </form>
            </section>
          </section>
        )}
      </>
    </>
  );
}
