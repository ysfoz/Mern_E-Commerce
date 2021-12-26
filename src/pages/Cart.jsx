import {
  Container,
  Button,
  Bottom,
  TopButton,
  Summery,
  SummeryItem,
  SummeryItemPrice,
  SummeryTitle,
  SummeryItemText,
  Wrapper,
  Title,
  Top,
  TopTexts,
  Info,
  SummeryItemNot,
  MainTitle,
  MainTitleContainer,
 
} from "./styles/Cart.style";

import CartProduct from "../components/CartProduct";
import CartModal from "../components/CartModal";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from "react";
import { userRequest } from "../helper/requestMethods";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { addProductsToOrders } from "../redux/cartRedux";
import {moveProductstoOrdersAndDelete} from "../helper/requestMethods"

const KEY = process.env.REACT_APP_STRIPE;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const userId = useSelector(state=> state.user?.currentUser?._id)
  const [stripeToken, setStripeToken] = useState(null);
  const [modalFlag, setModalFlag] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const onToken = (token) => {
    setStripeToken(token);
  };

  const makeRequest = async () => {
    
    try {
      const res = await userRequest.post("/checkout/payment", {
        tokenId: stripeToken.id,
        amount: cart.total * 100
      }).then(moveProductstoOrdersAndDelete(dispatch,userId))
      // .then(dispatch(addProductsToOrders()))
      navigate("/orders",{ state: {
        stripeData: res.data,
        products: cart.products,
        quantity:cart.quantity,
        total:cart.total
      }})
      
    } catch(err) {
      console.log(err)
    }
  };

  useEffect(() => {
    stripeToken && makeRequest()
  }, [stripeToken, cart.total]);



  const getData = async (twochar) => {
    try {
      const res = await axios.get(
        "https://mern-e-commerce-api.herokuapp.com/api/products"
      );
      const newData = res?.data.filter(
        (item) => item.title.slice(0, 2) === twochar
      );
      setData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const seeLikeThisClicked = (twochar) => {
    getData(twochar);
    setTimeout(() => {
      setModalFlag(true);
    }, 1000);
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => navigate("/")}>CONTINUE SHOPPING</TopButton>
          <TopTexts></TopTexts>
          <Link to={"/orders"}>
            <TopButton type="filled">Orders</TopButton>
          </Link>
        </Top>
        <Bottom>
          <MainTitleContainer>
            <MainTitle>Shopping Basket</MainTitle>

            <Info>
              {cart?.quantity === 0 ? (
                <div style={{ color: "blueviolet" }}>
                  Your Shopping Basket is empty
                </div>
              ) : (
                cart?.products?.map((product, index) => (
                  <CartProduct
                    product={product}
                    key={index}
                    inWhichList="products"
                    seeLikeThisClicked={seeLikeThisClicked}
                    inProducts
                  />
                ))
              )}
            </Info>
            {cart?.saveforlater.length > 0 && (
              <MainTitle>Your save for later items</MainTitle>
            )}
            <Info>
              {cart?.saveforlater?.map((product, index) => (
                <CartProduct
                  product={product}
                  key={index}
                  inWhichList="saveforlater"
                  seeLikeThisClicked={seeLikeThisClicked}
                />
              ))}
            </Info>
          </MainTitleContainer>
          <Summery>
            <SummeryTitle>ORDER SUMMERY</SummeryTitle>
            <SummeryItem>
              <SummeryItemText>Subtotal</SummeryItemText>
              <SummeryItemPrice>$ {cart.total}</SummeryItemPrice>
            </SummeryItem>
            <SummeryItem style={{ marginBottom: "0px" }}>
              <SummeryItemText>Estimated Shipping</SummeryItemText>
              <SummeryItemPrice>$ 5.90</SummeryItemPrice>
            </SummeryItem>
            <SummeryItemNot>
              On purchases $60 or more, shipping is FREE!!!
            </SummeryItemNot>
            <SummeryItem>
              <SummeryItemText>Shipping Discount</SummeryItemText>
              <SummeryItemPrice>
                {cart.total >= 60 ? "$ -5.90" : " $ 0.00"}
              </SummeryItemPrice>
            </SummeryItem>
            <SummeryItem type="total">
              <SummeryItemText>Total</SummeryItemText>
              <SummeryItemPrice>
                ${" "}
                {cart.total >= 60 || cart.total === 0
                  ? cart.total
                  : cart.total + 5.9}
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
            </StripeCheckout>
          </Summery>
        </Bottom>
      </Wrapper>
      <Footer />
      {modalFlag && <CartModal setModalFlag={setModalFlag} data={data} />}
    </Container>
  );
};

export default Cart;
