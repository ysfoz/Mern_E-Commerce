
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import styled from "styled-components";


const Title = styled.h2` 
text-align: center;
font-size: 40px;
color: teal;
padding: 15px;
margin: 10px;
font-weight: 500;
border-bottom: 2px solid teal;
border-top: 2px solid teal;
font-family:  'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
background-color: floralwhite;
`

const Home = () => {
 
  
  return (
    <>
      <Announcement />
      <Navbar  />
      <Slider />
      <Categories />
      <Title>Most Populer Products </Title>
      <Products />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
