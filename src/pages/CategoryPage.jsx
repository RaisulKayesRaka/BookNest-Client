import ReactStars from "react-rating-stars-component";

export default function CategoryPage() {
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
  ];

  return (
    <section className="mx-auto w-11/12 max-w-screen-xl py-8">
      <h1 className="pb-8 text-3xl font-semibold">Science Fiction Books</h1>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="flex flex-col gap-4 rounded-xl border p-4 shadow"
          >
            <img
              src={book.image}
              className="aspect-video w-full rounded-md object-contain"
              alt="Book Cover"
            />
            <p className="rounded-lg bg-blue-100 px-4 py-1 text-center text-sm font-semibold text-blue-600">
              {book.category}
            </p>
            <div className="flex-1">
              <h3 className="text-center font-bold transition-colors">
                {book.title}
              </h3>
              <p className="text-center text-sm italic">{book.author}</p>
            </div>

            <p className="text-center">
              <span className="font-semibold">Quantity:</span> {book.quantity}
            </p>

            <div className="flex items-center justify-center gap-4 rounded-lg bg-slate-100 p-2">
              <p className="font-semibold">Rating:</p>
              <ReactStars
                count={5}
                value={book.rating}
                isHalf={true}
                size={24}
                edit={false}
              />
              <span className="text-sm">{book.rating}/5</span>
            </div>

            <button className="w-full rounded-lg bg-blue-500 px-4 py-1.5 font-semibold text-white transition-colors hover:bg-blue-600">
              View Details
            </button>
          </div>
        ))}
      </section>
    </section>
  );
}
