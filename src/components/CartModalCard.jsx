import React from "react";
import {
  Container,
  Image,
  HeaderWrapper,
  Title,
  Price,
  FilterColor,
  FilterContainer,
  Button,
} from "./styles/CartModelCard.style";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartModalCard = ({ item }) => {
  const selectedProduct = useSelector((state) => state.cart.products);

  const selectedProductButtonColor = () => {
    for (let i of selectedProduct) {
      if (i._id === item._id) {
        return { bg: "crimson", text: "in your basket" };
      }
    }
  };
  return (
    <Container>
      <Image src={item.img} />
      <HeaderWrapper>
        <Title>{item.title}</Title>
        <Title>{item._id}</Title>
        <Price>Price : {item.price}</Price>
        <FilterContainer>
          {item?.color?.map((c, index) => (
            <FilterColor color={c} key={index} />
          ))}
        </FilterContainer>
      </HeaderWrapper>
      <Link to={`/product/${item._id}`}>
      <Button style={{ backgroundColor: selectedProductButtonColor()?.bg }}>
        {selectedProductButtonColor()?.text || "See Details"}{" "}
      </Button>
      </Link>
    </Container>
  );
};

export default CartModalCard;
