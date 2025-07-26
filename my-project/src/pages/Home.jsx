import React from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/auth";
import Slider from "../components/Slider";
import ProductList from "../components/ProductList";
import AllCategories from "./AllCategories";

const Home = () => {
  const [auth, setAuth] = useAuth();

  return (
    <Layout title={"best offers"}>
        <Slider/>
        <ProductList/>
        <AllCategories/>
      {/* <pre>{JSON.stringify(auth, null, 4)}</pre>/ */}
    </Layout>
  );
};

export default Home;
