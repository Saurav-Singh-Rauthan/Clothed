import React, { useEffect } from "react";
import { connect } from "react-redux";

import Carousel from "../../Carousel/Carousel";
import Subsection from "../../Subsection/Subsection";

import img1 from "../../../assests/arturo-rey-5yP83RhaFGA-unsplash.jpg";
import img2 from "../../../assests/shanna-camilleri-ljNQxfyN7AM-unsplash.jpg";

const Home = (props) => {
  const images = [img1, img2];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Carousel img={images} />
      <Subsection type="shorts" heading={true} />
      <Subsection type="shirts" heading={true} />
      <Subsection type="jeans" heading={true} />
      <Subsection type="shoes" heading={true} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Home);
