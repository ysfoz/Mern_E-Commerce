import {
  Container,
  Button,
  Bottom,
  TopButton,
  Hr,
  Summery,
  SummeryItem,
  SummeryItemPrice,
  SummeryTitle,
  SummeryItemText,
  Wrapper,
  Title,
  Top,
  TopText,
  TopTexts,
  Info,
} from "./styles/Cart.style";
import React from "react";
import CartProduct from "../components/CartProduct";

import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from "react";
import { userRequest } from "../helper/requestMethods";
import { useNavigate } from "react-router-dom";

const KEY = process.env.REACT_APP_STRIPE;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  const makeRequest = async () => {
    try {
      const res = await userRequest?.post("/checkout/payment", {
        tokenId: stripeToken?.id,
        amount: 500,
      });
      console.log(res);
      navigate("/success", {
        stripeData: res.data,
        products: cart,
      });
    } catch {}
  };

  useEffect(() => {
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart?.products?.map((product, index) => (
              <CartProduct product={product} index={index} />
            ))}

            <Hr />
          </Info>
          <Summery>
            <SummeryTitle>ORDER SUMMERY</SummeryTitle>
            <SummeryItem>
              <SummeryItemText>Subtotal</SummeryItemText>
              <SummeryItemPrice>$ {cart.total}</SummeryItemPrice>
            </SummeryItem>
            <SummeryItem>
              <SummeryItemText>Estimated Shipping</SummeryItemText>
              <SummeryItemPrice>$ 5.90</SummeryItemPrice>
            </SummeryItem>
            <SummeryItem>
              <SummeryItemText>Shipping Discount</SummeryItemText>
              <SummeryItemPrice>
                {cart.total >= 60 ? "$ -5.90" : " $ 0.00"}
              </SummeryItemPrice>
            </SummeryItem>
            <SummeryItem type="total">
              <SummeryItemText>Total</SummeryItemText>
              <SummeryItemPrice>
                $ {cart.total >= 60 ? cart.total : cart.total + 5.9}
              </SummeryItemPrice>
            </SummeryItem>
            <StripeCheckout
              name="Shopping"
              image="https://i1.silvergames.com/j/b/shopping-cart-hero.jpg"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
              <SummeryItemText>
                On purchases $60 or more, shipping is FREE!!!
              </SummeryItemText>
            </StripeCheckout>
          </Summery>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
