import { Link } from "react-router-dom";
import {
  Details,
  ProductName,
  Product,
  ProductColor,
  ProductDetail,
  ProductId,
  ProductSize,
  Image,
  ColorSizeContainer,
  Button,
} from "./styles/OrderProducts.style";

const OrderProducts = ({ index, product }) => {
  
  return (
    <>
      <Product key={index}>
        <ProductDetail>
          <Image src={product?.img} />
          <Details>
            <ProductName>
              <b>Product:</b>
              {product?.title}
            </ProductName>
            <ProductId>
              <b>ID:</b>
              {product?._id}
            </ProductId>
            <ColorSizeContainer>
              <ProductColor color={product?.color} />
              <ProductSize>
                <b>Size:</b> {product?.size}
              </ProductSize>
            </ColorSizeContainer>
            <ProductName>
              <b>Quantity:</b> {product?.quantity}
            </ProductName>
            <ProductName>
              <b>Total Price:</b> $ {product?.price * product?.quantity}
            </ProductName>
            <Link to={`/product/${product.productId}`}>
              <Button>Buy it again</Button>
              {/* <Button onClick={()=> navigate(`/product/${product._id}`,{state:{product:product}})}>Buy it 222again</Button> */}
            </Link>
          </Details>
        </ProductDetail>
      </Product>
    </>
  );
};

export default OrderProducts;
