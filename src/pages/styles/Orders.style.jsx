import styled from "styled-components";
import { mobile,tablet,ipadpro } from "../../responsive";

export const Container = styled.div``;

export const OrdersContainer = styled.div`
  display: flex;
  margin: 10px;
  justify-content: center;

`;


export const Wrapper= styled.div` 
display: flex;
flex-wrap: wrap;
justify-content: flex-start;
${mobile({justifyContent:"center"})}
${tablet({width:"80%"})}
${ipadpro({width:"80%",justifyContent:"space-between"})}
`

export const Toasty = styled.div`
  background-color: lightgreen;
  padding: 20px;
  color: aliceblue;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  position: relative;
  animation: mymove 5s infinite;
  animation-timing-function: ease;
  @keyframes mymove {
    from {
      bottom: 90%;
    }
    to {
      top: 0px;
    }
  }
`;

export const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
  border: 0.2px solid teal;
  background-color: transparent;
  color: filled;
  ${mobile({ width: "48%" })}
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ padding: "20px 5px " })}
`;
