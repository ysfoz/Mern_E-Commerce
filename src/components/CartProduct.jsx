import {
  ProductAmount,
  ProductAmountContainer,
  Details,
  PriceDetail,
  ProductName,
  Product,
  ProductColor,
  ProductDetail,
  ProductId,
  ProductPrice,
  ProductSize,
  Image,
  ColorSizeContainer,
} from "./styles/CartProduct.style";
import { Add, Remove } from "@material-ui/icons";
import CartFooter from "./CartFooter";
import { useDispatch, useSelector } from "react-redux";
import { removeall } from "../redux/cartRedux";
import { useEffect, useState } from "react";
import { changeQuantityDB } from "../helper/requestMethods";
const CartProduct = ({
  product,
  inWhichList,
  seeLikeThisClicked,
  inProducts,
}) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product?.quantity);
  const userId = useSelector((state) => state.user?.currentUser?._id);
  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity((prev) => prev - 1);
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  useEffect(() => {
    changeQuantityDB(dispatch, userId, product._id, quantity);
  }, [quantity]);

  return (
    <>
      <Product>
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
          </Details>
        </ProductDetail>
        <PriceDetail>
          <ProductAmountContainer>
            <Remove onClick={() => inProducts && handleQuantity("dec")} />

            <ProductAmount>{quantity}</ProductAmount>
            <Add onClick={() => inProducts && handleQuantity("inc")} />
          </ProductAmountContainer>
          <ProductPrice>$ {product?.price}</ProductPrice>
          <ProductPrice style={{ fontSize: "12px", color: "blueviolet" }}>
            $ {product?.price * product.quantity}
          </ProductPrice>
        </PriceDetail>
      </Product>
      <CartFooter
        product={product}
        inWhichList={inWhichList}
        seeLikeThisClicked={() => seeLikeThisClicked(product.title.slice(0, 2))}
      />
    </>
  );
};

export default CartProduct;
