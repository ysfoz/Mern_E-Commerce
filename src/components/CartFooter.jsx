import React from "react";
import { Container, ButtonContainer, Button } from "./styles/CartFooter.style";
import {
  deleteProduct,
  addSaveForLater,
  deleteSaveForLater,
  addProductsFromSaveForLater,
} from "../redux/cartRedux";
import { useDispatch } from "react-redux";


const CartFooter = ({ product, inWhichList,setModalFlag }) => {
  const dispatch = useDispatch();

  const deleteItem = () => {
    const id = product?._id;
    if (inWhichList === "products") {
      dispatch(deleteProduct(id));
    } else {
      dispatch(deleteSaveForLater(id));
    }
  };

  const addSaveForLaterList = () => {
    const id = product?._id;
    if (inWhichList === "products") {
      dispatch(addSaveForLater(id));
    } else {
      dispatch(addProductsFromSaveForLater(id));
    }
  };

  
  return (
    <Container>
      <ButtonContainer>
        <Button onClick={deleteItem}>Delete</Button>
        <Button onClick={addSaveForLaterList}>
          {inWhichList === "products" ? "Save for later" : "move to basket"}
        </Button>
        <Button onClick={()=> setModalFlag(true)}>See more like this</Button>
      </ButtonContainer>
    </Container>
  );
};

export default CartFooter;
