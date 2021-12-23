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
import { useDispatch } from "react-redux";
import { setProductQuantity, removeall } from "../redux/cartRedux";
import { useEffect, useState } from "react";

const CartProduct = ({
  product,
  inWhichList,
  seeLikeThisClicked,
  inProducts,
}) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product?.quantity);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity((prev) => prev - 1);
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  useEffect(() => {
    // const id = product._id
    // console.log("🚀 ~ file: CartProduct.jsx ~ line 39 ~ useEffect ~ id", id)
    dispatch(setProductQuantity({ id: product._id, quantity: quantity }));
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
          <Remove onClick={() => dispatch(removeall())} />
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
