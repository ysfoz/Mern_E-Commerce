import React, { useState } from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import { useCallback } from "react";

const Home = () => {
  const [profileFlag, setProfileFlag] = useState(false)
    
  //   , () => {
  //   console.log('object')
  //   document.addEventListener("click", closeMenu);
  // });
  // const closeMenu = () => {
  //   setProfileFlag(false, () => {
  //     console.log("22")
  //     document.removeEventListener("click", closeMenu);
  //   });
  // };
  return (
    <div>
      <Announcement />
      <Navbar profileFlag={profileFlag} setProfileFlag={setProfileFlag} />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
