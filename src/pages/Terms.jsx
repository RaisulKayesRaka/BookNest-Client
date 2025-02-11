import { Helmet } from "react-helmet-async";

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | BookNest</title>
      </Helmet>
      <section className="mx-auto w-11/12 max-w-screen-xl py-8">
        <h1 className="mb-8 flex items-center justify-center rounded-lg bg-blue-500 p-4 text-2xl font-semibold text-white">
          Terms & Conditions
        </h1>
        <section className="rounded-lg py-6 shadow">
          <p className="mb-4">
            Welcome to BookNest! These terms and conditions outline the rules
            and regulations for the use of BookNest's Website.
          </p>
          <p className="mb-4">
            By accessing this website we assume you accept these terms and
            conditions. Do not continue to use BookNest if you do not agree to
            take all of the terms and conditions stated on this page.
          </p>
          <p className="mb-4">
            We employ the use of cookies. By accessing BookNest, you agreed to
            use cookies in agreement with the BookNest's Privacy Policy.
          </p>
          <p className="mb-4">
            Unless otherwise stated, BookNest and/or its licensors own the
            intellectual property rights for all material on BookNest. All
            intellectual property rights are reserved. You may access this from
            BookNest for your own personal use subjected to restrictions set in
            these terms and conditions.
          </p>
          <p className="mb-4">
            Parts of this website offer an opportunity for users to post and
            exchange opinions and information in certain areas of the website.
            BookNest does not filter, edit, publish or review Comments prior to
            their presence on the website. Comments do not reflect the views and
            opinions of BookNest, its agents, and/or affiliates.
          </p>
          <p className="font-semibold">Sincerely,</p>
          <p>The BookNest Team</p>
        </section>
      </section>
    </>
  );
}
