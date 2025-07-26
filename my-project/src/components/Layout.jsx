import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';

const Layout = ({ children,title,discription,keywords,author }) => {
  return (
    <div>
<Helmet>
  <meta charSet="utf-8" />
  <title>{title}</title>
  <meta name="description" content={discription} />
  <meta name="keywords" content={keywords} />
  <meta name="author" content={author} />
</Helmet>

      <Header />
      <main className=" min-h-[88vh]  ">
        <div className=" ">
        <ToastContainer />
         {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};
Layout.defaultProps={
  title:'Ecommerce app',
  discription:"mern stack project",
  keywords:"mern,react,node,express,mongoose",
  author:"Adeel"
}

export default Layout;
