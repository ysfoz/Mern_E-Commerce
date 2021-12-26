import {
  Container,
  OrdersContainer,
  Toasty,
  TopButton,
  Top,
} from "./styles/Orders.style";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import OrderProducts from "../components/OrderProducts";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProductList = (props) => {
  const [stripeData, setStripeData] = useState({});
  console.log(
    "🚀 ~ file: Orders.jsx ~ line 20 ~ ProductList ~ stripeData",
    stripeData
  );
  const orders = useSelector((state) => state.cart.orders);
  const location = useLocation();
  const navigate = useNavigate();
  const [toasty, setToasty] = useState(false);

  const setNavigateItems = () => {
    if (location.state) {
      setStripeData({
        stripeData: location.state.stripeData,
        products: location.state.products,
        quantity: location.state.quantity,
        total: location.state.total,
      });
      setToasty(true);
    }
  };

  useEffect(() => {
    setNavigateItems();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setToasty(false);
    }, 5000);
  }, [toasty]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Top>
        <TopButton onClick={() => navigate("/")}>CONTINUE SHOPPING</TopButton>
      </Top>
      {toasty && stripeData && (
        <Toasty>
          You payed ${stripeData?.total} for{" "}
          {stripeData?.quantity} items succesfully`
        </Toasty>
      )}
      <OrdersContainer>
        {orders?.map((product, i) => (
          <OrderProducts product={product} key={i} />
        ))}
      </OrdersContainer>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
