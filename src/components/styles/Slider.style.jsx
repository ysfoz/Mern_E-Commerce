import { mobile,tablet,ipadpro } from "../../responsive"
import styled from "styled-components";

export const Container = styled.div`
width: 100%;
height: 100vh;
display: flex;
position: relative;
overflow: hidden;
${mobile({display:"none"})}
${tablet("height:75vh")}
${ipadpro("height:75vh")}



`;

export const Arrow = styled.div`
width: 50px;
height: 50px;
background-color: #fff7f7;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
position: absolute;
top: 0;
bottom: 0;
margin: auto;
left: ${(props) => props.direction === "left" && "10px"};
right: ${(props) => props.direction === "right" && "10px"};
cursor: pointer;
opacity: 0.5;
z-index: 2;
`;
export const Wrapper = styled.div`
height: 100%;
display: flex;
transition: all 1.5s ease;
transform: translateX(${props =>props.slideIndex * -100}vw);


`;

export const Slide = styled.div`
width: 100vw;
height: 100vh;
display: flex;
align-items: center;
background-color: #${props=> props.bg};
`;
export const ImgContainer = styled.div`
width: 100%;
height: 100%;
flex: 1;
${tablet("width:60%")}
${ipadpro("width:60%")}
`;
export const Image = styled.img`
height: 80%;
${tablet("height:65%")}
${ipadpro("height:65%")}
`;
export const InfoContainer = styled.div`
flex: 1;
padding: 50px;
`;

export const Title = styled.h1`
font-size: 70px;
${tablet("font-size:30px")}
${ipadpro("font-size:30px")}
`;

export const Desc = styled.p`
font-size: 20px;
letter-spacing:3px;
font-weight: 500;
margin: 50px 0px;
`;

export const Button = styled.button`
font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
color:teal;
padding: 10px;
font-size: 16px;
background-color: transparent;
cursor: pointer;
border: 2px solid transparent;
border-radius: 5px;
box-shadow: 0 4px 8px 3px rgba(0, 50.2, 50.2, 0.4), 0 6px 20px 3px rgba(0, 50.2, 50.2, 0.4);
`;