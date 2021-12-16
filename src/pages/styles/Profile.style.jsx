import styled from "styled-components";

export const UserWrapper = styled.div`

  padding: 20px;

 
`;

export const UserTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
`;

export const UserContainer = styled.div`
  display: flex;
  margin-top: 20px;
  width: 60%;
  justify-content:space-around;
 
  
`;

export const UserShow = styled.div`
 
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

export const UserUpdate = styled.div`
 
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin-left: 20px;
  display: flex;
`;

export const UserShowBottom = styled.div`
  margin-top: 20px;
`;

export const UserShowInfo = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  margin: 20px 0px;
  color: #444;
  & div{
    color:crimson
  }
`;

export const UserUpdateForm = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  flex-direction: column;
`;

export const UserUpdateItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  & div{
    color:crimson
  }
  & label {
    margin-bottom: 5px;
    font-size: 14px;
    
  }
`;

export const UserUpdateInput = styled.input`
  border: none;
  width: 250px;
  height: 30px;
  border-bottom: 1px solid gray;
`;

export const UserUpdateUpload = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const UserUpdateImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
  margin-bottom: 20px;
`;

export const UserUpdateButton = styled.button`
  border-radius: 5px;
  border: none;
  padding: 5px;
  cursor: pointer;
  background-color: ${props=> props.color};
  color: white;
  font-weight: 600;
`;
