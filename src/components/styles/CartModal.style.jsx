import styled from "styled-components"

export const ModalContainer= styled.div` 
position: fixed;
top: 0;
bottom: 0;
left: 0;
right: 0;
background-color:rgba(0,0,0,0.5);
display:flex;
align-items: center;
justify-content: center;

`
export const ModalHeaderWrapper = styled.div` 
display: flex;
align-items:flex-start ;
justify-content: space-between;
flex:1;



`
export const ModalHeader= styled.div` 
margin: 10px;
font-size: 20px;
`
export const Button= styled.button` 
padding: 5px 10px ;
font-size: 20px;
box-shadow: 0 4px 8px 3px rgba(0, 50.2, 50.2, 0.6), 0 6px 20px 3px rgba(0, 50.2, 50.2, 0.6);
margin: 10px;
:hover{
    cursor:pointer;
}

`

export const Wrapper = styled.div` 
width: 80%;
height: 80%;
border-radius: 10px;
background-color: white;

display:flex;
flex-direction: column;
/* justify-content: space-between; */
`

export const CardWrapper = styled.div` 
display: flex;
background-color: white;
flex:4;
margin: 0px 10px 20px 10px;
/* justify-content: space-evenly; */
overflow: scroll;
scrollbar-color:green;




`

