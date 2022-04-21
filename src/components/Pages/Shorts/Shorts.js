import React, { useEffect } from "react";

import Pageview from "../../Pageview/Pageview";

const Shorts = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    props.getUserDetails();
  }, []);

  return <Pageview type="shorts" />;
};

export default Shorts;
