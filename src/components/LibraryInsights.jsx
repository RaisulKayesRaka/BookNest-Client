import CountUp from "react-countup";
import { FaBookmark } from "react-icons/fa";

export default function LibraryInsights() {
  const stats = [
    {
      id: 1,
      title: "Active Users",
      value: 3000,
    },
    {
      id: 2,
      title: "Total Books",
      value: 5000,
    },
    {
      id: 3,
      title: "Books Borrowed",
      value: 2000,
    },
    {
      id: 4,
      title: "Books Returned",
      value: 1800,
    },
  ];

  return (
    <section className="mx-auto w-11/12 max-w-screen-xl py-16">
      <section className="space-y-1 text-center">
        <div className="flex items-center justify-center gap-2 text-blue-500">
          <FaBookmark className="text-sm" />
          <h3 className="font-semibold">Library Insights</h3>
        </div>

        <h2 className="text-2xl font-semibold">
          Key Metrics That Define Our Success
        </h2>
      </section>
      <div className="h-8"></div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex flex-col items-center justify-center rounded-lg border border-blue-500 p-6"
          >
            <h3 className="text-3xl font-bold text-blue-500">
              <CountUp end={stat.value} duration={10} suffix="+" />
            </h3>
            <p className="text-lg font-semibold">{stat.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
