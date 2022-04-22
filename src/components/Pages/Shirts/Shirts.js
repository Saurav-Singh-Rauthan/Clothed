import React, { useEffect } from "react";

import Pageview from "../../Pageview/Pageview";

const Shirts = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <Pageview type="shirts" />;
};

export default Shirts;
