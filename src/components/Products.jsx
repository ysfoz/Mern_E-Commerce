import { Container } from "./styles/Products.style";
import React, { useState, useEffect } from "react";
import Product from "./Product";
import axios from "axios";
import { useSelector } from "react-redux";

const Products = ({ cat, filters, sort,homepage }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const searchedText = useSelector((state) => state.product.searchText);

  // get all products with category
  const getAllData = async () => {
    try {
      const res = await axios.get(
        cat
          ? `https://mern-e-commerce-api.herokuapp.com/api/products?category=${cat}`
          : `https://mern-e-commerce-api.herokuapp.com/api/products`
      );
      if(cat==="summer" || cat ==="winter" || cat ==="accessories"){
        const filteredData = res?.data.filter((product)=> {
          return product.inSale === true
        })
        setProducts(filteredData);
      } else {
        setProducts(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // filtered products by seach input

  const searchText = (value) => {
    const filteredList = products.filter((item) => {
      const userText = searchedText.toUpperCase();
      const productTitel = item.title.toUpperCase();
      return productTitel.indexOf(userText) > -1;
    });
   
    setFilteredProducts(filteredList);
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
    searchText();
  }, [searchedText]);

  useEffect(() => {
    getAllData();
  }, [cat]);
  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    getFilteredData();
  }, [products, cat, filters]);

  useEffect(() => {
    getSortedData();
  }, [sort]);

  return (
    <Container>
      

      
      {!searchedText && homepage
        ? products
            .sort((a, b) => b.salesAmount - a.salesAmount)
            .slice(0, 8)
            .map((item) => <Product item={item} key={item._id} />)
        : filteredProducts.map((item) => (
            <Product item={item} key={item._id} />
          ))}
          
    </Container>
  );
};

export default Products;
