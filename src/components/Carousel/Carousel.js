import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Skeleton from "@mui/material/Skeleton";

import Styles from "./Caraousel.module.css";

const CarouselComp = (props) => {
  const [imgLoad, setimgLoad] = useState(0);

  return (
    <Carousel
      autoPlay={true}
      dynamicHeight={true}
      showArrows={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
    >
      {/* {imgLoad >= 3 ? (
        images
      ) : (
        
      )} */}

      {props.img.map((img, index) => {
        return (
          <div key={`${img} ${index}`} className={Styles.imgContainer}>
            <img
              style={
                imgLoad >= 3
                  ? { objectFit: "cover", height: "100%" }
                  : { display: "none" }
              }
              src={img}
              alt="img"
              onLoad={() => {
                setimgLoad(imgLoad + 1);
              }}
            />
            {imgLoad >= 3 ? null : (
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={"100%"}
                height={"100%"}
              />
            )}
          </div>
        );
      })}
    </Carousel>
  );
};

export default CarouselComp;
