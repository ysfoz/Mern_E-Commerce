import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 420px) {
      ${props}
    }
  `;
};
export const tablet = (props) => {
  return css`
    @media only screen and (min-width: 750px) and (max-width:421){
      ${props}
    }
  `;
};
export const bigScreen = (props) => {
  return css`
    @media only screen and (min-width: 1450px) {
      ${props}
    }
  `;
};
