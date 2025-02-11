import { Helmet } from "react-helmet-async";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | BookNest</title>
      </Helmet>
      <section className="mx-auto w-11/12 max-w-screen-xl py-8">
        <h1 className="mb-8 flex items-center justify-center rounded-lg bg-blue-500 p-4 text-2xl font-semibold text-white">
          About Us
        </h1>
        <section className="rounded-lg py-6 shadow">
          <p className="mb-4">
            Welcome to BookNest, your number one source for all things books. We're dedicated to giving you the very best of our collection, with a focus on variety, accessibility, and user satisfaction.
          </p>
          <p className="mb-4">
            Founded in 2025, BookNest has come a long way from its beginnings. When we first started out, our passion for books drove us to do tons of research so that BookNest can offer you the world's most extensive collection of books. We now serve customers all over the world and are thrilled that we're able to turn our passion into our own website.
          </p>
          <p className="mb-4">
            We hope you enjoy our platform as much as we enjoy offering it to you. If you have any questions or comments, please don't hesitate to contact us.
          </p>
          <p className="font-semibold">Sincerely,</p>
          <p>The BookNest Team</p>
        </section>
      </section>
    </>
  );
}