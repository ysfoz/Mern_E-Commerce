import React from "react";
import { Container, ButtonContainer, Button } from "./styles/CartFooter.style";
import {
  addSaveForLater,
  deleteSaveForLater,
  addProductsFromSaveForLater,
} from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import { deleteoneProductfromDB } from "../helper/requestMethods";

const CartFooter = ({ product, inWhichList, seeLikeThisClicked }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.currentUser?._id);
  const token = useSelector((state) => state.user?.jwtToken);

  const deleteItem = () => {
    deleteoneProductfromDB(dispatch, userId, product?._id,token);
    dispatch(deleteSaveForLater(product._id)); // for redux
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
        <Button onClick={seeLikeThisClicked}>See more like this</Button>
      </ButtonContainer>
    </Container>
  );
};

export default CartFooter;
