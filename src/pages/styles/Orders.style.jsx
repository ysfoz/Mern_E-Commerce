import styled from "styled-components";
import { mobile } from "../../responsive";


export const Container = styled.div`

`;



export const OrdersContainer =styled.div` 
display: flex;
flex-wrap:wrap;
margin: 20px 40px;

`

export const Toasty = styled.div` 
background-color: lightgreen;
/* width: fit-content; */
padding: 20px;
color: aliceblue;
font-size: 20px;
font-weight: 600;
text-align: center;
position: relative;
  animation: mymove 5s infinite;
  animation-timing-function: ease;
 @keyframes mymove {
  from {bottom: 90%;}
  to {top: 0px;}
  
}
`

export const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
  border: ${(props) =>
    props.type === "filled" ? "none " : "0.2px solid teal"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  ${mobile({ width: "48%" })}
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ padding: "20px 5px " })}
`;

