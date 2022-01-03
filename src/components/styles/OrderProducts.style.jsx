import styled from "styled-components";
import { mobile} from "../../responsive";

export const Product = styled.div`
  display: flex;
  border-bottom: 1px solid lightgray;
  margin: 10px 5px;
  background-color: white;
  padding: 10px 5px;
  flex-direction: column;
`;
export const ProductDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Image = styled.img`
  max-width: 150px;
  max-height: 170px;
  align-self: center;
`;
export const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
export const ProductId = styled.span`
  ${mobile({ margin: "5px" })}
`;
export const ProductName = styled.span`
  ${mobile({ margin: "5px" })}
`;
export const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
export const ProductSize = styled.span``;

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
  display: flex;
  justify-content: space-around;
  ${mobile({ margin: "5px" })}
`;
export const Button = styled.button`
  background-color: teal;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;
