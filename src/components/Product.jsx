import { Container, Circle, Image, Info, Icon } from "./styles/Product.style";
import {
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUpdateCart } from "../helper/requestMethods";

const Product = ({ item }) => {
  const currentUser = useSelector((state) => state.user?.currentUser);
  const token = useSelector((state) => state.user?.jwtToken);
  console.log("🚀 ~ file: Product.jsx ~ line 14 ~ Product ~ token", token)
  const dispatch = useDispatch();

  const addProductToProductsList = () => {
    createUpdateCart(dispatch, currentUser?._id, token, {
      productId: item?._id,
      title: item?.title,
      price: item?.price,
      img: item?.img,
      quantity: 1,
      color: item.color[0],
      size: item.size[0],
    });
   
  };
  return (
    <Container bg={item.inSale ? "rgba(251,233,231,0.3)" : "#f5fbfd"}>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon>
          <ShoppingCartOutlined onClick={addProductToProductsList} />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
       
      </Info>
    </Container>
  );
};

export default Product;
