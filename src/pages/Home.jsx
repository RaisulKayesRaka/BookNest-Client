import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import LibraryInsights from "../components/LibraryInsights";
import FAQ from "../components/FAQ";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>BookNest</title>
      </Helmet>
      <Banner />
      <LibraryInsights />
      <hr className="mx-auto w-1/2 max-w-prose border-blue-500" />
      <FAQ />
    </>
  );
}
