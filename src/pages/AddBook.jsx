import { Helmet } from "react-helmet-async";

export default function AddBook() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const image = form.image.value;
    const name = form.name.value;
    const category = form.category.value;
    const authorName = form.authorName.value;
    const quantity = form.quantity.value;
    const rating = form.rating.value;
    const shortDescription = form.shortDescription.value;
    const bookContent = form.bookContent.value;

    const newBook = {
      image,
      name,
      category,
      authorName,
      quantity,
      rating,
      shortDescription,
      bookContent,
    };

    console.log(newBook);
  };

  return (
    <>
      <Helmet>
        <title>Add Book | BookNest</title>
      </Helmet>
      <section className="mx-auto w-11/12 max-w-screen-xl py-8">
        <h1 className="mb-8 flex items-center justify-center rounded-lg border bg-blue-500 p-4 text-2xl font-semibold text-white">
          Add Book
        </h1>
        <section className="rounded-lg p-6 shadow">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Image */}
              <div>
                <label htmlFor="image" className="mb-2 block font-medium">
                  Image
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  placeholder="Enter image URL (e.g., imgbb)"
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
                  type="url"
                  id="name"
                  name="name"
                  placeholder="Enter title of the book"
                  className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="mb-2 block font-medium">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
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
                <label htmlFor="authorName" className="mb-2 block font-medium">
                  Author Name
                </label>
                <input
                  type="text"
                  id="authorName"
                  name="authorName"
                  placeholder="Enter author name"
                  className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                  required
                />
              </div>

              {/* Quantity */}
              <div>
                <label htmlFor="quantity" className="mb-2 block font-medium">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  placeholder="Enter quantity"
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
                  min={1}
                  max={5}
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
                  className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                  required
                  defaultValue={""}
                />
              </div>
              {/* Book Content */}
              <div className="sm:col-span-2">
                <label htmlFor="bookContent" className="mb-2 block font-medium">
                  Book Content
                </label>
                <textarea
                  id="bookContent"
                  name="bookContent"
                  rows={3}
                  placeholder="Enter book content"
                  className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                  required
                  defaultValue={""}
                />
              </div>

              {/* Submit Button */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-500 py-2 font-bold text-white"
                >
                  Add Book
                </button>
              </div>
            </div>
          </form>
        </section>
      </section>
    </>
  );
}
