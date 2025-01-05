import ReactStars from "react-rating-stars-component";
import { Link, useParams } from "react-router-dom";

export default function CategoryPage() {
  const { category } = useParams();
  const books = [
    {
      id: 1,
      title: "The Expanse: Nemesis Games",
      author: "James S. A. Corey",
      category: "Science Fiction",
      quantity: 5,
      rating: 4.5,
      image:
        "https://i.thriftbooks.com/api/imagehandler/l/B256EA247045FB2E8104E20F9A3DFC74E442B777.jpeg",
    },
    {
      id: 2,
      title: "The Expanse: Nemesis Games",
      author: "James S. A. Corey",
      category: "Science Fiction",
      quantity: 5,
      rating: 3,
      image:
        "https://i.thriftbooks.com/api/imagehandler/l/B256EA247045FB2E8104E20F9A3DFC74E442B777.jpeg",
    },
    {
      id: 3,
      title: "Rich Dad Poor Dad",
      author: "Robert Kiosaki",
      category: "Business",
      quantity: 5,
      rating: 3,
      image:
        "https://i.thriftbooks.com/api/imagehandler/l/B256EA247045FB2E8104E20F9A3DFC74E442B777.jpeg",
    },
  ];

  const filteredBooks = books.filter((book) => book.category === category);

  return (
    <section className="mx-auto w-11/12 max-w-screen-xl py-8">
      <h1 className="mb-8 flex items-center justify-center rounded-lg border bg-blue-500 p-4 text-2xl font-semibold text-white">
        {category} Books
      </h1>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filteredBooks.map((book) => (
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
              <p className="text-center text-sm italic">{book?.author}</p>
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

            <Link
              to={`/book/${book?.id}`}
              className="block w-full rounded-lg bg-blue-500 px-4 py-1.5 text-center font-semibold text-white transition-colors hover:bg-blue-600"
            >
              View Details
            </Link>
          </div>
        ))}
      </section>
    </section>
  );
}
