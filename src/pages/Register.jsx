import React,{useState} from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../helper/firebase";
import { createUser } from '../helper/requestMethods'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router'



const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.p`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: ${props => props.bg};
  color: ${props => props.color};
  cursor: pointer;
`;
const Error = styled.div`
  color:darkred;
`
const Label = styled.label`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  background-color: teal;
  color: white;
  cursor: pointer;
  text-align:center;
`

const ButtonWrapper =styled.div`
  display:flex;
  justify-content:space-between;
`


const Register = () => {
  const [imgFile, setImgFile] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  


  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      img: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("username is required")
        .min(3, "Username is too short - should be 3 chars minimum."),
      email: Yup.string()
        .email("Invalid Email")
        .required("Email is required!!"),
      password: Yup.string()
        .required("No password provided.")
        .min(6, "Password is too short - should be 6 chars minimum."),
      img: Yup.string()
    }),
    onSubmit: (values) => {
      imgFile ? handleClick(values) : createUser(dispatch,values)
      navigate('/login')
    },
  });


  const handleClick = (values)=> {
    const fileName= "profilePhoto" + new Date().getTime() + imgFile[0]?.name
    const storage = getStorage(app)
    const usersRef = ref(storage,`users/${values.username}/`)
    const storageRef = ref(usersRef,fileName)
    const uploadTask = uploadBytesResumable(storageRef, imgFile[0]);

  
  
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
          
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
  
        // ...
  
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const newUser = {...values, img:downloadURL }
        createUser(dispatch, newUser)
        navigate("/login")
        
      });
    }
    );
   
    
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={formik.handleSubmit}>
          <Input 
          placeholder="name"
          id="username"
            name="username"
            type="text"
            placeholder="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <Error>{formik.errors.username}</Error>
          ) : null}
          <Input 
          id="email"
          type="email"
          placeholder="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <Error>{formik.errors.email}</Error>
        ) : null}
          <Input 
          id="password"
          type="password"
          placeholder="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <Error>{formik.errors.password}</Error>
        ) : null}
         <Label htmlFor="img">
              Add a profile Photo
            </Label>
            <Input type="file" id="img" name="img" style={{ display: "none" }}  onChange={(e) => setImgFile(e.target.files)}
            />
          
          <Agreement>
            By creating an account, I consept to processing of my personal data
            in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <ButtonWrapper>
          <Button type="submit" color="white" bg="teal" >CREATE</Button>
          <Button type="button" color="teal" bg="white" onClick={()=> navigate('/login')} >SIGN IN</Button>
          </ButtonWrapper>
        </Form>
          
      </Wrapper>
    </Container>
  );
};

export default Register;
