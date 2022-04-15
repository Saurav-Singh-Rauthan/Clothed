import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import Styles from "./Description.module.css";
import Subsection from "../../Subsection/Subsection";

const Description = (props) => {
  const [params, setparams] = useSearchParams();
  console.log(params.get("type"), params.get("item"));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={Styles.container}>
      <div className={Styles.descContainer}>
        <div className={Styles.img}>
          <FavoriteBorderIcon
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              margin: "1rem",
              width: "28px"
            }}
          />
          <img
            style={{ objectFit: "contain", height: "350px" }}
            src="https://rukminim2.flixcart.com/image/580/696/kfikya80/short/6/6/f/l-3007-3008-3018-fastcolors-original-imafvxt8w27m8jgz.jpeg?q=50"
            alt=""
          />
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio vero
          itaque dignissimos amet cum odio, hic necessitatibus? Deleniti
          facilis, dignissimos aspernatur magnam eveniet, dolore expedita
          voluptatum assumenda ea consequuntur iusto?
        </div>
      </div>

      <div>
        <p className={Styles.similarItems}>People also like</p>
        <Subsection type={params.get("type")} heading={false} />
      </div>
    </div>
  );
};

export default Description;
