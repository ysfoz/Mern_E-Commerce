import styled from "styled-components";
import {  mobile } from "../../responsive";




export const Product = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid lightgray;
  /* margin-bottom: 3px; */
  margin-right: 25px;
  background-color: white;

  
  ${mobile({ flexDirection: "column",marginRight:"3px" })}
`;
export const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${mobile({ flexDirection: "column",marginRight:"3px" })}
`;

export const Image = styled.img`
  max-width: 150px;
  max-height: 170px;
  ${mobile({ alignSelf:"center"})}
  
`;
export const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
export const ProductId = styled.span`
${mobile({  margin:"5px" })}`;
export const ProductName = styled.span`
${mobile({  margin:"5px" })}
`;
export const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
export const ProductSize = styled.span``;
export const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
export const ProductAmount = styled.div`
  font-size: 20px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;
export const ProductPrice = styled.div`
  font-size: 25px;
  font-weight: 200;
  ${mobile({ marginBottom: "15px" })}
`;

export const ColorSizeContainer = styled.div` 
 display:flex; 
justify-content:space-around;
${mobile({  margin:"5px" })}
`

