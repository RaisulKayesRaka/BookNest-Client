import { FaBookmark, FaQuoteLeft } from "react-icons/fa6";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Farhan Ahmed",
      feedback:
        "This is a great platform for book lovers. I have found so many books here that I couldn't find anywhere else.",
    },
    {
      id: 2,
      name: "Kamrul Hasan",
      feedback: "I love the variety of books available here. It's amazing!",
    },
    {
      id: 3,
      name: "Shamsul Haque",
      feedback: "I have been using this platform for a while now and I am very satisfied with the service.",
    },
  ];

  return (
    <>
      <section className="mx-auto w-11/12 max-w-screen-xl py-16">
        <section className="space-y-1 text-center">
          <div className="flex items-center justify-center gap-2 text-blue-500">
            <FaBookmark className="text-sm" />
            <h3 className="font-semibold">Testimonials</h3>
          </div>

          <h2 className="text-2xl font-semibold">What Our Users Say</h2>
        </section>
        <div className="h-8"></div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative rounded-lg border border-blue-500 p-6"
            >
              <p className="text-center italic">{testimonial.feedback}</p>
              <p className="mt-4 text-center text-sm font-semibold">
                {testimonial.name}
              </p>
              <div className="absolute -left-2 -top-2 z-10 rounded-full bg-blue-500 p-1 text-2xl text-white">
                <FaQuoteLeft />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Testimonials;
