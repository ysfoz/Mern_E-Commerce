import React from "react";
import { Container, ButtonContainer, Button } from "./styles/CartFooter.style";
import { deleteProduct,addSaveForLater,addSaveForLater2 } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const CartFooter = ({ product }) => {
  const dispatch = useDispatch();

  const deleteItem = () => {
    const id = product?._id;

    dispatch(deleteProduct(id));
  };

  const addSaveForLaterList = () => {
    const id = product?._id;
    // const price = product?.price * product?.quantity
    dispatch(addSaveForLater(id))
  }

  const addSave2 = ()=>{
    dispatch(addSaveForLater2())
  }
  return (
    <Container>
      <ButtonContainer>
        <Button onClick={deleteItem}>Delete</Button>
        <Button onClick={addSaveForLaterList}>Save for later</Button>
        <Button onClick={addSave2}>Save </Button>
        <Button>See more like this</Button>
      </ButtonContainer>
    </Container>
  );
};

export default CartFooter;
