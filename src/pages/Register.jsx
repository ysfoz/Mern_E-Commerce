import {Container,Title,Wrapper,Form,Input,Error,Label,Agreement,Button,ButtonWrapper} from "./styles/Register.style"
import React,{useState} from "react";
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
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from 'react-router'





const Register = () => {
  const [imgFile, setImgFile] = useState(null);
  console.log("🚀 ~ file: Register.jsx ~ line 92 ~ Register ~ imgFile", imgFile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isFetching, error } = useSelector((state) => state.user);
  


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
    console.log("🚀 ~ file: Register.jsx ~ line 119 ~ Register ~ values", values)
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
          <Button type="submit" color="white" bg="teal" disabled={isFetching} >CREATE</Button>
          <Button type="button" color="teal" bg="white" onClick={()=> navigate('/login')} >SIGN IN</Button>
          </ButtonWrapper>
        </Form>
        {error && <Error>Something went wrong !!!</Error>}
      </Wrapper>
    </Container>
  );
};

export default Register;
