import {
  Container,
  Image,
  Info,
  Title,
  Button,
} from "./styles/CategoryItem.style";
import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Link to={`/products/${item.cat}`}>
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
