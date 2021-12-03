import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  

  // get all products with category
  const getAllData = async () => {
    try {
      const res = await axios.get(
        cat
          ? `https://mern-e-commerce-api.herokuapp.com/api/products?category=${cat}`
          : `https://mern-e-commerce-api.herokuapp.com/api/products`
      );
      setProducts(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  // filtered products by color and size
  const getFilteredData = () => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  };

  const getSortedData = () => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  };

  useEffect(() => {
    getAllData();
  }, [cat]);

  useEffect(() => {
    getFilteredData();
  }, [products, cat, filters]);

  useEffect(() => {
    getSortedData();
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => (<Product item={item} key={item._id} />))
        : products
            .slice(0, 8)
            .map((item) => ( <Product item={item} key={item._id} />))}
    </Container>
  );
};

export default Products;
