import {
  Container,
  Title,
  FilterContainer,
  Filter,
  Select,
  Option,
  FilterText,
} from "./styles/ProductList.style";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useLocation } from "react-router";

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
      setFilters({
        ...filters,
        [e.target.name]: e.target.value,
      });
    
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
