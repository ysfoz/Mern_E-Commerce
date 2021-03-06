import styled from "styled-components";
import { mobile } from "../../responsive"


export const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
background-color: white;
margin-right: 25px;
${mobile({marginBottom:'10px', marginRight:'0px'})}
`
export const ButtonContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`
export const Button = styled.button` 
background-color: white;
border: none;
border-left:1px solid lightgray;
color:slateblue
`
