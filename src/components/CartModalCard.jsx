import React from "react";
import {
  Container,
  Image,
  HeaderWrapper,
  Title,
  Price,
  FilterColor,
  FilterContainer,
} from "./styles/CartModelCard.style";

const CartModalCard = ({ item }) => {
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
    </Container>
  );
};

export default CartModalCard;
