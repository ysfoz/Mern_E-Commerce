import styled from "styled-components";
import { mobile, tablet, bigScreen } from "../../responsive";

export const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease;
`;
export const Container = styled.div`
  margin: 5px;
  min-width: 250px;
  width: 32%;
  max-width: 400px;
  ${mobile("width:90%")}
  ${tablet("width:40%")}
    height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  ${bigScreen("width:24%")}

  &:hover ${Info} {
    opacity: 1;
  }
`;
export const Circle = styled.div`
  width: 80%;
  height: 330px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

export const Image = styled.img`
  height: 75%;
  z-index: 2;
`;
export const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
