import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import LibraryInsights from "../components/LibraryInsights";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>BookNest</title>
      </Helmet>
      <Banner />
      <LibraryInsights />
    </>
  );
}
