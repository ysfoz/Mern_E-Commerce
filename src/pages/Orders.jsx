import {
  Container,
  OrdersContainer,
  Toasty,
  TopButton,
  Top,
  Wrapper,
} from "./styles/Orders.style";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import OrderProducts from "../components/OrderProducts";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { moveProductstoOrdersAndDelete } from "../helper/requestMethods";

const ProductList = (props) => {
  const [stripeData, setStripeData] = useState({});
  const orders = useSelector((state) => state.cart.orders);
  const token = useSelector((state) => state.user?.jwtToken);
  const userId = useSelector((state) => state.user?.currentUser?._id);
  const location = useLocation();
  const navigate = useNavigate();
  const [toasty, setToasty] = useState(false);
  const dispatch = useDispatch();
  const setNavigateItems = () => {
    if (location.state) {
      const idList = location.state.products.map(
        (product) => product.productId
      );
      setStripeData({
        stripeData: location.state.stripeData,
        products: location.state.products,
        quantity: location.state.quantity,
        total: location.state.total,
      });
      setToasty(true);
      moveProductstoOrdersAndDelete(dispatch, userId, idList, token);
    }
  };

  useEffect(() => {
    setNavigateItems();
  }, []);

  useEffect(() => {
    toasty &&
      setTimeout(() => {
        setToasty(false);
        navigate({ state: {} });
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
          You payed $
          {stripeData?.total < 60 ? stripeData?.total + 5.9 : stripeData?.total}{" "}
          for {stripeData?.quantity} items succesfully`
        </Toasty>
      )}
      <OrdersContainer>
        <Wrapper>
          {orders?.map((product, i) => (
            <OrderProducts product={product} key={i} />
          ))}
        </Wrapper>
      </OrdersContainer>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
