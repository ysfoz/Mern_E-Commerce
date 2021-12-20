import { Container, Circle, Image, Info, Icon } from "./styles/Product.style";
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {addProduct} from "../redux/cartRedux"




const Product = ({ item }) => {
// console.log("🚀 ~ file: Product.jsx ~ line 16 ~ Product ~ item", item)
  const dispatch = useDispatch()

  const addProductToProductsList = () => {
  dispatch(addProduct({...item,quantity:1,color:item.color[0],size:item.size[0]}))
  }
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon>
          <ShoppingCartOutlined onClick={addProductToProductsList}/>
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
