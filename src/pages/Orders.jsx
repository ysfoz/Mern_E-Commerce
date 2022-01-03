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
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { moveProductstoOrdersAndDelete } from "../helper/requestMethods";

const ProductList = (props) => {
  const [stripeData, setStripeData] = useState({});
  const orders = useSelector((state) => state.cart.orders);
  const userId = useSelector((state) => state.user?.currentUser?._id);
  const location = useLocation();
  const navigate = useNavigate();
  const [toasty, setToasty] = useState(false);
  const [idList, setIdList] = useState();
  const dispatch = useDispatch();
  const setNavigateItems = () => {
    if (location.state) {
      setStripeData({
        stripeData: location.state.stripeData,
        products: location.state.products,
        quantity: location.state.quantity,
        total: location.state.total,
      });
      setToasty(true);
      moveProductstoOrdersAndDelete(dispatch, userId, idList);
    }
  };

  useEffect(() => {
    setNavigateItems();
  }, []);

  useEffect(() => {
    toasty &&
    setTimeout(() => {
      setToasty(false);
    }, 5000);
  }, [toasty]);

  useEffect(() => {
    const productIdList = stripeData?.products?.map(
      (product) => product.productId
    );
    setIdList(productIdList);
  }, [stripeData]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Top>
        <TopButton onClick={() => navigate("/")}>CONTINUE SHOPPING</TopButton>
      </Top>
      {toasty && stripeData && (
        <Toasty>
          You payed ${stripeData?.total} for {stripeData?.quantity} items
          succesfully`
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
