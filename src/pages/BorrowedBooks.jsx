import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

export default function BorrowedBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loaded_books = [
      {
        id: 1,
        title:
          "The Expanse: Nemesis Games The Expanse: Nemesis Games The Expanse: Nemesis Games",
        author: "James S. A. Corey",
        category: "Science Fiction",
        quantity: 5,
        rating: 4.5,
        borrowed_date: "2023-05-01",
        return_date: "2023-06-01",
        image:
          "https://i.thriftbooks.com/api/imagehandler/l/B256EA247045FB2E8104E20F9A3DFC74E442B777.jpeg",
      },
      {
        id: 2,
        title: "The Expanse: Nemesis Games",
        author: "James S. A. Corey",
        category: "Science Fiction",
        quantity: 0,
        rating: 3,
        borrowed_date: "2023-05-01",
        return_date: "2023-06-01",
        image:
          "https://i.thriftbooks.com/api/imagehandler/l/B256EA247045FB2E8104E20F9A3DFC74E442B777.jpeg",
      },
    ];
    setBooks(loaded_books);
  }, []);

  return (
    <>
      <Helmet>
        <title>Borrowed Books | BookNest</title>
      </Helmet>
      <section className="mx-auto w-11/12 max-w-screen-xl py-8">
        <h1 className="mb-8 flex items-center justify-center rounded-lg border bg-blue-500 p-4 text-2xl font-semibold text-white">
          Borrowed Books
        </h1>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((book) => (
            <div
              key={book?.id}
              className="flex flex-col gap-4 rounded-xl border p-4 shadow"
            >
              <img
                src={book?.image}
                className="aspect-video w-full rounded-md object-contain"
                alt="Book Cover"
              />
              <p className="rounded-lg bg-blue-100 px-4 py-1 text-center text-sm font-semibold text-blue-600">
                {book?.category}
              </p>
              <div className="flex-1">
                <h3 className="text-center font-bold transition-colors">
                  {book?.title}
                </h3>
              </div>

              <div className="space-y-1 rounded-lg bg-blue-50 p-4">
                <p className="">
                  <span className="font-semibold">Borrowed Date:</span>{" "}
                  {book?.borrowed_date}
                </p>
                <p className="">
                  <span className="font-semibold">Return Date:</span>{" "}
                  {book?.return_date}
                </p>
              </div>

              <button className="w-full rounded-lg bg-blue-500 px-4 py-1.5 font-semibold text-white transition-colors hover:bg-blue-600">
                Return
              </button>
            </div>
          ))}
        </section>
      </section>
    </>
  );
}
