import { useState } from "react";
import { FaBookmark } from "react-icons/fa";

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I borrow a book?",
      answer:
        "Simply go to the book’s details page and click the 'Borrow' button. You’ll need to select a return date, and your name and email will be automatically added. Once confirmed, the book will appear in your Borrowed Books list.",
    },
    {
      id: 2,
      question: "Can I borrow more than one book at a time?",
      answer:
        "Yes, you can borrow multiple books, but you can’t borrow the same book twice at the same time. If there’s a limit, like 3 books per user, you’ll see an alert if you try to borrow more.",
    },
    {
      id: 3,
      question: "How can I return a book I borrowed?",
      answer:
        "Go to your Borrowed Books page, find the book you want to return, and click the 'Return' button. This will update the library’s system and remove the book from your borrowed list.",
    },
    {
      id: 4,
      question: "How do I update the details of a book?",
      answer:
        "If you have permission, go to the All Books page, find the book you want to edit, and click 'Update'. You can then modify details like the book’s title, author, or category.",
    },
    {
      id: 5,
      question: "Can I search for available books only?",
      answer:
        "Yes! On the All Books page, use the 'Show Available Books' filter to see only books that are currently in stock.",
    },
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section id="faq" className="py-16">
      <div className="mx-auto w-11/12 max-w-screen-xl">
        <section className="space-y-1 text-center">
          <div className="flex items-center justify-center gap-2 text-blue-500">
            <FaBookmark className="text-sm" />
            <h3 className="font-semibold">Frequently Asked Questions</h3>
          </div>

          <h2 className="text-2xl font-semibold">
            We’ve Got the Answers You’re Looking For
          </h2>
        </section>
        <div className="h-8"></div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="cursor-pointer rounded-lg border border-blue-500 p-4 transition-all duration-300"
              onClick={() => toggleFAQ(faq.id)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <span
                  className={`transform transition-transform duration-300 ${
                    openFAQ === faq.id ? "rotate-180" : ""
                  }`}
                >
                  ⌵
                </span>
              </div>
              <div
                className={`mt-2 overflow-hidden transition-all duration-500 ease-in-out ${
                  openFAQ === faq.id
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
