import React, { useEffect } from "react";

import Pageview from "../../Pageview/Pageview";

const Shoes = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    props.getUserDetails();
  }, []);

  return <Pageview type="shoes" />;
};

export default Shoes;
