import React from 'react'
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
    ColorSizeContainer
  } from "./styles/CartProduct.style";
  import { Add, Remove } from "@material-ui/icons";
  import CartFooter from "./CartFooter"

const CartProduct = ({index,product}) => {
    return (
      <>
        <Product key={index}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b>
                      {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b>
                      {product._id}
                    </ProductId>
                    <ColorSizeContainer>

                    
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size.toUpperCase()}
                    </ProductSize>
                    </ColorSizeContainer>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add />
                    <ProductAmount>{product.quantity}</ProductAmount>

                    <Remove />
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
              <CartFooter/>
              </>
    )
}

export default CartProduct
