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
import {  removeAll} from "../redux/cartRedux"
import { useDispatch } from "react-redux"
 

 

const CartProduct = ({index,product,inWhichList,seeLikeThisClicked}) => {


  const dispatch = useDispatch()
 

  
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
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Remove />
                    
                    <ProductAmount>{product?.quantity}</ProductAmount>
                    <Add />
                   
                    <Remove onClick={()=> dispatch(removeAll())}/>

                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product?.price * product?.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
              <CartFooter product ={product} inWhichList={inWhichList}  seeLikeThisClicked={()=>seeLikeThisClicked(product.title.slice(0,2))}/>
              </>
    )
}

export default CartProduct
