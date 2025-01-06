import { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet-async";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import Loading from "../components/Loading";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

export default function AllBooks() {
  const { user } = useContext(AuthContext);
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

  const handleUpdateSubmit = async (e, id) => {
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

    console.log(newBook);

    try {
      const { data } = await axios.put(
        "http://localhost:5000/update-book/" + id,
        newBook,
      );
      if (data.modifiedCount > 0) {
        toast.success("Book updated successfully");
        document.getElementById("update-modal-" + id).close();
        form.reset();
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === id ? { ...book, ...newBook } : book,
          ),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          <Loading />
        ) : (
          <>
            {view === "card" && (
              <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {books.map((book) => (
                  <>
                    <div
                      key={book?._id}
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
                        onClick={() =>
                          document
                            .getElementById(`update-modal-${book?._id}`)
                            .showModal()
                        }
                        className={`w-full rounded-lg px-4 py-1.5 font-semibold text-white transition-colors ${book?.email !== user?.email ? "cursor-not-allowed bg-gray-400 opacity-50" : "bg-blue-500 hover:bg-blue-600"}`}
                        disabled={book?.email !== user?.email}
                      >
                        Update
                      </button>
                    </div>

                    <dialog id={`update-modal-${book?._id}`} className="modal">
                      <div className="modal-box max-w-screen-lg">
                        <form method="dialog">
                          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <form
                          onSubmit={(e) => handleUpdateSubmit(e, book?._id)}
                        >
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {/* Image */}
                            <div>
                              <label
                                htmlFor="image"
                                className="mb-2 block font-medium"
                              >
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
                              <label
                                htmlFor="name"
                                className="mb-2 block font-medium"
                              >
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
                                <option value="Science Fiction">
                                  Science Fiction
                                </option>
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
                              <label
                                htmlFor="rating"
                                className="mb-2 block font-medium"
                              >
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
                      </div>
                    </dialog>
                  </>
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
                      <>
                        <tr
                          key={book?._id}
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
                            <button
                              onClick={() =>
                                document
                                  .getElementById(`update-modal-${book?._id}`)
                                  .showModal()
                              }
                              className={`rounded-lg px-4 py-1.5 font-semibold text-white transition-colors ${book?.email !== user?.email ? "cursor-not-allowed bg-gray-400 opacity-50" : "bg-blue-500 hover:bg-blue-600"}`}
                              disabled={book?.email !== user?.email}
                            >
                              Update
                            </button>
                          </td>
                        </tr>
                        <dialog
                          id={`update-modal-${book?._id}`}
                          className="modal"
                        >
                          <div className="modal-box max-w-screen-lg">
                            <form method="dialog">
                              <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                                ✕
                              </button>
                            </form>
                            <form
                              onSubmit={(e) => handleUpdateSubmit(e, book?._id)}
                            >
                              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* Image */}
                                <div>
                                  <label
                                    htmlFor="image"
                                    className="mb-2 block font-medium"
                                  >
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
                                  <label
                                    htmlFor="name"
                                    className="mb-2 block font-medium"
                                  >
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
                                    <option value="Science Fiction">
                                      Science Fiction
                                    </option>
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
                                  <label
                                    htmlFor="rating"
                                    className="mb-2 block font-medium"
                                  >
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
                          </div>
                        </dialog>
                      </>
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
