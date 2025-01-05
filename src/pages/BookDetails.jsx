import { useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import ReactStars from "react-rating-stars-component";

export default function BookDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const books = [
    {
      id: 1,
      name: "The Expanse: Nemesis Games",
      authorName: "James S. A. Corey",
      category: "Science Fiction",
      quantity: 5,
      rating: 4.5,
      image:
        "https://i.thriftbooks.com/api/imagehandler/l/B256EA247045FB2E8104E20F9A3DFC74E442B777.jpeg",
    },
    {
      id: 2,
      name: "The Expanse: Nemesis Games",
      authorName: "James S. A. Corey",
      category: "Science Fiction",
      quantity: 5,
      rating: 3,
      image:
        "https://i.thriftbooks.com/api/imagehandler/l/B256EA247045FB2E8104E20F9A3DFC74E442B777.jpeg",
    },
    {
      id: 3,
      name: "Rich Dad Poor Dad",
      authorName: "Robert Kiosaki",
      category: "Business",
      quantity: 5,
      rating: 3,
      image:
        "https://i.thriftbooks.com/api/imagehandler/l/B256EA247045FB2E8104E20F9A3DFC74E442B777.jpeg",
    },
  ];

  const loaderData = books.find((book) => book.id == id);

  const handleBorrowSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const returnDate = form.returnDate.value;
    const borrowerName = form.borrowerName.value;
    const borrowerEmail = form.borrowerEmail.value;

    const borrowDetails = {
      returnDate,
      borrowerName,
      borrowerEmail,
      bookId: loaderData?._id,
    };

    console.log(borrowDetails);
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

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <img
            src={loaderData?.image}
            alt={loaderData?.name}
            className="w-full rounded-lg"
          />
          <div className="sm:col-span-1 md:col-span-2">
            <h2 className="text-2xl font-semibold">{loaderData?.name}</h2>
            <p className="mb-4">{loaderData?.authorName}</p>
            <p className="mb-4 inline-block rounded-lg bg-blue-100 px-4 py-1 text-center text-sm font-semibold text-blue-600">
              {loaderData?.category}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Quantity:</span>{" "}
              {loaderData?.quantity}
            </p>

            <div className="mb-3 flex items-center gap-4">
              <p className="font-semibold">Rating:</p>
              <ReactStars
                count={5}
                value={4.5}
                isHalf={true}
                size={24}
                edit={false}
              />
              <span className="text-sm">{4.5}/5</span>
            </div>
            <div className="mb-4 rounded-lg bg-blue-50 p-4">
              <p className="mb-2 font-semibold">Short Description:</p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Possimus esse omnis voluptatem delectus. Impedit assumenda
                dignissimos modi eaque molestiae hic?
              </p>
            </div>
            <div className="mb-4 rounded-lg bg-blue-50 p-4">
              <p className="mb-2 font-semibold">Book Content:</p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Possimus esse omnis voluptatem delectus. Impedit assumenda
                dignissimos modi eaque molestiae hic?
              </p>
            </div>
            <button
              onClick={() =>
                document.getElementById("borrow_modal").showModal()
              }
              className="w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white"
            >
              Borrow this book
            </button>
          </div>
        </section>
        {/* Borrow Book Modal */}
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
