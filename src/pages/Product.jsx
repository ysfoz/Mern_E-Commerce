import {
  Container,
  ImgContainer,
  Wrapper,
  Image,
  InfoContainer,
  Title,
  Desc,
  Price,
  FilterContainer,
  Filter,
  FilterTitle,
  FilterColor,
  FilterSize,
  FilterSizeOption,
  AddContainer,
  Amount,
  AmountContainer,
  Button,
} from "./styles/Product.style";
import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { Add, Remove } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../helper/requestMethods";
// import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUpdateCart } from "../helper/requestMethods";

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  const fetchData = async () => {
    try {
      const res = await publicRequest.get("/products/find/" + id);
      setProduct(res?.data);
      color === "" && setColor(res?.data?.color[0]);
      size === "" && setSize(res?.data?.size[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity((prev) => prev - 1);
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleClick = () => {
  
    createUpdateCart(dispatch, currentUser?._id, 
      {
      productId: product?._id,
      title: product?.title,
      price: product?.price,
      img:product?.img,
      quantity,
      color,
      size,
    },
  );
    // dispatch(addProduct({ ...product, quantity, color, size }));
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product?.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product?.title}</Title>
          <Desc>{product?.desc}</Desc>
          <Price>$ {product?.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product?.color?.map((c, index) => (
                <FilterColor
                  color={c}
                  key={index}
                  onClick={() => setColor(c)}
                />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product?.size?.map((s, index) => (
                  <FilterSizeOption key={index}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={currentUser ? handleClick : navigate("/login")}>
              ADD TO CART
            </Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
