import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const CarouselComp = (props) => {
  return (
    <Carousel
      autoPlay={true}
      dynamicHeight={true}
      showArrows={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
    >
      {props.img.map((img, index) => {
        return (
          <div key={`${img} ${index}`}>
            <img
              style={{ objectFit: "cover", height: "500px" }}
              src={img}
              alt="img"
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default CarouselComp;
