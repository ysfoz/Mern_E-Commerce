import React from "react";
import { Container, ButtonContainer, Button } from "./styles/CartFooter.style";
import { deleteProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const CartFooter = ({ product }) => {
  const dispatch = useDispatch();

  const deleteItem = () => {
    const id = product?._id;

    dispatch(deleteProduct(id));
  };
  return (
    <Container>
      <ButtonContainer>
        <Button onClick={deleteItem}>Delete</Button>
        <Button>Save for later</Button>
        <Button>See more like this</Button>
      </ButtonContainer>
    </Container>
  );
};

export default CartFooter;
