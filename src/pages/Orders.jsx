import {
  Container,
  OrdersContainer
  
} from "./styles/ProductList.style";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import OrderProducts from "../components/OrderProducts"
import { useSelector } from "react-redux";


const ProductList = () => {
const orders = useSelector(state=> state.cart.orders)
 

  

  return (
    <Container>
      <Navbar />
      <Announcement />
      <OrdersContainer>
      {orders.map((product,i)=> <OrderProducts product={product} key={i}/> )}

      </OrdersContainer>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
