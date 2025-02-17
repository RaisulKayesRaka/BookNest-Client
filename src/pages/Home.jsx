import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import LibraryInsights from "../components/LibraryInsights";
import FAQ from "../components/FAQ";
import Categories from "../components/Categories";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>BookNest</title>
      </Helmet>
      <Banner />
      <Categories />
      <hr className="mx-auto w-1/2 max-w-prose border-blue-500" />
      <LibraryInsights />
      <hr className="mx-auto w-1/2 max-w-prose border-blue-500" />
      <Testimonials />
      <hr className="mx-auto w-1/2 max-w-prose border-blue-500" />
      <FAQ />
    </>
  );
}
