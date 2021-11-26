import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
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
  console.log(
    "🚀 ~ file: Products.jsx ~ line 17 ~ Products ~ filteredProducts",
    filteredProducts
  );

  // get all product with category
  const getAllData = async () => {
    try {
      const res = await axios.get(
        cat
          ? `http://localhost:5001/api/products?category=${cat}`
          : `http://localhost:5001/api/products`
      );
      setProducts(res.data);
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
 



  useEffect(() => {
    getAllData();
  }, [cat]);

  useEffect(() => {
    getFilteredData();
  }, [products, cat, filters]);

  return (
    <Container>
      {filteredProducts.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
