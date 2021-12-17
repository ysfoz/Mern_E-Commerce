import styled from "styled-components";
import {  mobile } from "../../responsive";



export const Container = styled.div``;

export const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

export const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ padding: "20px 5px " })}
`;

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

export const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
export const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
export const Info = styled.div`
  flex: 3;
 
`;


export const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

export const Summery = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

export const SummeryTitle = styled.h1`
  font-weight: 200;
`;

export const SummeryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

export const SummeryItemText = styled.span``;

export const SummeryItemPrice = styled.span``;
export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

export const SummeryItemNot = styled.div` 
font-size: 10px;
color: blueviolet;
`