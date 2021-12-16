import {
  UserContainer,
  UserShow,
  UserShowBottom,
  UserShowInfo,
  UserTitleContainer,
  UserUpdateButton,
  UserUpdateForm,
  UserUpdateImg,
  UserUpdateInput,
  UserUpdateItem,
  UserUpdateUpload,
  UserWrapper,
  UserUpdate,
} from "./styles/Profile.style";
import { useLocation, useNavigate } from "react-router-dom";
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
import { updateUser, deleteUser } from "../helper/requestMethods";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import avatar from "../assets/avatar.jpeg";
import axios from "axios";
import {
  getUserStart,
  getUserFailure,
  getUserUpdate,
} from "../redux/userRedux";

export default function User() {
  const location = useLocation();
  const userId = location?.pathname.split("/")[2];

  const user = useSelector((state) => state.user?.currentUser);
  console.log("🚀 ~ file: Profile.jsx ~ line 39 ~ User ~ user", user);
  const jwtToken = useSelector((state) => state.user.jwtToken);
  console.log("🚀 ~ file: Profile.jsx ~ line 41 ~ User ~ jwtToken", jwtToken);
  // console.log("🚀 ~ file: Profile.jsx ~ line 38 ~ User ~ user", user)

  const [imgFile, setImgFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: user?.username,
      email: user?.email,
      password: "",
      isAdmin: user?.isAdmin,
      img: user?.img,
      tel: user?.tel,
      adress: user?.adress,
      fullname: user?.fullname,
      country: user?.country,
      city: user?.city,
      postalcode: user?.postalcode,
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
      tel: Yup.number(),
      adress: Yup.string(),
      fullname: Yup.string(),
      country: Yup.string(),
      city: Yup.string(),
      postalcode: Yup.number(),
      img: Yup.string(),
    }),
    onSubmit: (values) => {
      handleClick(values);
    },
  });

  const deleteImg = (img) => {
    const storage = getStorage(app);

    // Create a reference to the file to delete
    const desertRef = ref(storage, img);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  // the function did not work that is in userRequest
  const updateData = async (values) => {
    dispatch(getUserStart());
    try {
      const token = `Bearer ${jwtToken}`;
      const res = await axios.put(
        `https://mern-e-commerce-api.herokuapp.com/api/users/${userId}`,
        values,
        { headers: { token } }
      );
      dispatch(getUserUpdate(res.data));
    } catch (error) {
      dispatch(getUserFailure());
    }
  };

  const deleteData = async() =>{
    dispatch(getUserStart());
    try {
      const token = `Bearer ${jwtToken}`;
      const res = await axios.delete(
        `https://mern-e-commerce-api.herokuapp.com/api/users/${userId}`,
        { headers: { token } }
      );
      console.log("🚀 ~ file: Profile.jsx ~ line 131 ~ deleteData ~ res", res)
      dispatch(getUserUpdate());
    } catch (error) {
      dispatch(getUserFailure());
    }
  }
 

  const handleClick = (values) => {
    if (imgFile) {
      user?.img && deleteImg(user?.img);
      const fileName = "profilePhoto" + new Date().getTime() + imgFile[0]?.name;
      const storage = getStorage(app);
      const usersRef = ref(storage, "users/");
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
            updateData(newUser);
            navigate("/");
          });
        }
      );
    } else {
      updateData(values);
      navigate("/");
    }
  };
  const confirmDelete = () => {
    var r = window.confirm("Are you sure to Delete!");
    if (r === true) {
      deleteData();
      user.img && deleteImg(user.img);
      navigate("/login");
    }
  };

  return (
    <UserWrapper>
      <UserTitleContainer>
        <h1 className="userTitle">Edit User</h1>
      </UserTitleContainer>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <UserContainer>
          <UserShow>
            <UserShowBottom>
              <UserUpdateForm onSubmit={formik.handleSubmit}>
                <UserShowInfo>
                  <UserUpdateUpload>
                    <UserUpdateImg
                      src={
                        imgFile ? URL.createObjectURL(imgFile[0]) : user?.img
                      }
                      alt=""
                    />

                    <label
                      style={{ color: "lightgray", marginRight: "20px" }}
                      htmlFor="img"
                    >
                      Add an Image
                    </label>
                    <input
                      type="file"
                      id="img"
                      name="img"
                      style={{ display: "none" }}
                      onChange={(e) => setImgFile(e.target.files)}
                    />
                  </UserUpdateUpload>
                </UserShowInfo>
                <UserShowInfo>
                  <UserUpdateInput
                    id="adress"
                    name="adress"
                    type="text"
                    placeholder="Adress"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.adress}
                  />
                  {formik.touched.adress && formik.errors.adress ? (
                    <div>{formik.errors.adress}</div>
                  ) : null}
                </UserShowInfo>
                <UserShowInfo>
                  <UserUpdateInput
                    id="city"
                    name="city"
                    type="text"
                    placeholder="City"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                  />
                  {formik.touched.city && formik.errors.city ? (
                    <div>{formik.errors.city}</div>
                  ) : null}
                </UserShowInfo>
                <UserShowInfo>
                  <UserUpdateInput
                    id="postalcode"
                    name="postalcode"
                    type="text"
                    placeholder="Postalcode"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.postalcode}
                  />
                  {formik.touched.postalcode && formik.errors.postalcode ? (
                    <div>{formik.errors.postalcode}</div>
                  ) : null}
                </UserShowInfo>
                <UserShowInfo>
                  <UserUpdateInput
                    id="tel"
                    name="tel"
                    type="text"
                    placeholder="Tel"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.tel}
                  />
                  {formik.touched.tel && formik.errors.tel ? (
                    <div>{formik.errors.tel}</div>
                  ) : null}
                </UserShowInfo>
              </UserUpdateForm>
            </UserShowBottom>
          </UserShow>

          <UserUpdate>
            <UserUpdateForm onSubmit={formik.handleSubmit}>
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
              <UserUpdateItem>
                <UserUpdateInput
                  id="fullname"
                  name="fullname"
                  type="text"
                  placeholder="Full name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullname}
                />
                {formik.touched.fullname && formik.errors.fullname ? (
                  <div>{formik.errors.fullname}</div>
                ) : null}
              </UserUpdateItem>
              <UserUpdateItem className="userUpdateItem">
                <label htmlFor="email">Email</label>
                <UserUpdateInput
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Email"
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
                  placeholder="Password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </UserUpdateItem>

              {/* <UserUpdateRight> */}

              <UserUpdateButton type="submit" color="blue">
                Update
              </UserUpdateButton>
              <UserUpdateButton
                type="button"
                color="crimson"
                onClick={confirmDelete}
              >
                Delete
              </UserUpdateButton>
              {/* </UserUpdateRight> */}
            </UserUpdateForm>
          </UserUpdate>
        </UserContainer>
      </div>
    </UserWrapper>
  );
}
