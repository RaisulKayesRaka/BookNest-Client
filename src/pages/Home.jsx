import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>BookNest</title>
      </Helmet>
      <Banner />
    </>
  );
}
