import { Link } from "react-router-dom";
import styled from "styled-components";
// import "./user.css";
import { useLocation,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import app from "../helper/firebase";
import { updateUser } from "../helper/requestMethods";
import { useDispatch } from "react-redux";
import { useState } from "react";


const UserWrapper = styled.div`
  flex: 4;
  padding: 20px;
`;

const UserTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// const UserAddButton = styled.button`
//   width: 80px;
//   border: none;
//   padding: 5px;
//   background-color: teal;
//   border-radius: 5px;
//   cursor: pointer;
//   color: white;
//   font-size: 16px;
// `;

const UserContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const UserShow = styled.div`
  flex: 1;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const UserUpdate = styled.div`
  flex: 2;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin-left: 20px;
`;

const UserShowTop = styled.div`
  display: flex;
  align-items: center;
`;

const UserShowImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserShowTopTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const UserShowUsername = styled.span`
  font-weight: 600;
`;

const UserShowUserTitle = styled.span`
  font-weight: 300;
`;

const UserShowBottom = styled.div`
  margin-top: 20px;
`;

const UserShowTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: rgb(175, 170, 170);
`;

const UserShowInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;
  color: #444;
`;

//   .userShowIcon{
//       font-size: 16px !important;
//   }

const UserShowInfoTitle = styled.span`
  margin-left: 10px;
`;

const UserUpdateTitle = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

const UserUpdateForm = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const UserUpdateItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  & label {
    margin-bottom: 5px;
    font-size: 14px;
  }
`;

//   .userUpdateItem>label{
//       margin-bottom: 5px;
//       font-size: 14px;
//   }

const UserUpdateInput = styled.input`
  border: none;
  width: 250px;
  height: 30px;
  border-bottom: 1px solid gray;
`;

const UserUpdateRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const UserUpdateUpload = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const UserUpdateImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
  margin-bottom: 20px;
`;

//   .userUpdateIcon{
//       cursor: pointer;
//   }

const UserUpdateButton = styled.button`
  border-radius: 5px;
  border: none;
  padding: 5px;
  cursor: pointer;
  background-color: darkblue;
  color: white;
  font-weight: 600;
`;

export default function User() {
  const location = useLocation();
  const userId = location?.pathname.split("/")[2];
  const user = useSelector((state) => state.user.currentUser);
  const [imgFile, setImgFile] = useState(null);
  const dispatch = useDispatch();
  const navigate= useNavigate()
 

  const formik = useFormik({
    initialValues: {
      username: user?.username,
      email: user?.email,
      password: "",
      isAdmin: user?.isAdmin,
      img: user?.img,
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
      isAdmin: Yup.boolean().default(false),
      img: Yup.string(),
    }),
    onSubmit: (values) => {
      handleClick(values);
    },
  });

  const deleteImg = () => {
    const storage = getStorage(app);

    // Create a reference to the file to delete
    const desertRef = ref(storage, user?.img);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  const handleClick = (values) => {
    if (imgFile) {
      user?.img && deleteImg();
      const fileName = new Date().getTime() + imgFile[0]?.name;
      const storage = getStorage(app);
      const usersRef = ref(storage, `users/${values.username}/`);
      const storageRef = ref(usersRef, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imgFile[0]);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const newUser = { ...values, img: downloadURL };
            updateUser(dispatch, userId, newUser)
            console.log("🚀 ~ file: Profile.jsx ~ line 282 ~ getDownloadURL ~ values", values)
            navigate("/")
          });
        }
      );
    } else {
        updateUser(dispatch, userId, values)
        console.log("🚀 ~ file: Profile.jsx ~ line 289 ~ handleClick ~ values", values)
        navigate("/")    }
  };

  return (
    <UserWrapper>
      <UserTitleContainer>
        <h1 className="userTitle">Edit User</h1>
        {/* <Link to="/newUser">
          <userAddButton className="userAddButton">Create</userAddButton>
        </Link> */}
      </UserTitleContainer>
      <UserContainer>
        <UserShow>
          <UserShowTop>
            <UserShowImg
              src={
                user?.img
                  ? user?.img
                  : "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              }
              alt=""
            />
            <UserShowTopTitle>
              <UserShowUsername>{user?.username}</UserShowUsername>
              <UserShowUserTitle>Software Engineer</UserShowUserTitle>
            </UserShowTopTitle>
          </UserShowTop>
          <UserShowBottom>
            <UserShowTitle>Account Details</UserShowTitle>
            <UserShowInfo>
              {/* <PermIdentity className="userShowIcon" /> */}
              <UserShowInfoTitle>annabeck99</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfo>
              {/* <CalendarToday className="userShowIcon" /> */}
              <UserShowInfoTitle>10.12.1999</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowTitle>Contact Details</UserShowTitle>
            <UserShowInfo>
              {/* <PhoneAndroid className="userShowIcon" /> */}
              <UserShowInfoTitle>+1 123 456 67</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfo>
              {/* <MailOutline className="userShowIcon" /> */}
              <UserShowInfoTitle>{user?.email}</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfo>
              {/* <LocationSearching className="userShowIcon" /> */}
              <UserShowInfoTitle>New York | USA</UserShowInfoTitle>
            </UserShowInfo>
          </UserShowBottom>
        </UserShow>
        <UserUpdate>
          <UserUpdateTitle>Edit</UserUpdateTitle>
          <UserUpdateForm onSubmit={formik.handleSubmit}>
            <div className="userUpdateLeft">
              <UserUpdateItem>
                <label htmlFor="username">Username</label>
                <UserUpdateInput
                  id="username"
                  name="username"
                  type="text"
                  placeholder="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div>{formik.errors.username}</div>
                ) : null}
              </UserUpdateItem>

              <UserUpdateItem className="userUpdateItem">
                <label htmlFor="email">Email</label>
                <UserUpdateInput
                  id="email"
                  name="email"
                  type="text"
                  placeholder="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </UserUpdateItem>
              <UserUpdateItem className="userUpdateItem">
                <label htmlFor="password">Password</label>
                <UserUpdateInput
                  id="password"
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </UserUpdateItem>
            </div>
            <UserUpdateRight>
              <UserUpdateUpload>
                <UserUpdateImg src={user?.img} alt="" />
                {/* <label htmlFor="img">
                  Add an Image
                </label> */}
                <input
                  type="file"
                  id="img"
                  name="img"
                //   style={{ display: "none" }}
                  onChange={(e) => setImgFile(e.target.files)}
                />
              </UserUpdateUpload>
              <UserUpdateButton type="submit">Update</UserUpdateButton>
            </UserUpdateRight>
          </UserUpdateForm>
        </UserUpdate>
      </UserContainer>
    </UserWrapper>
  );
}
