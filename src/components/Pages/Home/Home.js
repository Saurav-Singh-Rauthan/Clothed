import React from "react";

import Carousel from "../../Carousel/Carousel";
import Subsection from '../../Subsection/Subsection';

import img1 from "../../../assests/arturo-rey-5yP83RhaFGA-unsplash.jpg";
import img2 from "../../../assests/shanna-camilleri-ljNQxfyN7AM-unsplash.jpg";

const Home = (props) => {
  const images = [img1, img2];
  return (
    <div>
      <Carousel img={images} />
      <Subsection type='shorts'/>
      <Subsection type='shirts'/>
      <Subsection type='jeans'/>
      <Subsection type='shoes'/>
    </div>
  );
};

export default Home;
