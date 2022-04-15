import React from "react";
import { connect } from "react-redux";

import Order from "./Order/Order";

const Orders = (props) => {
  return (
    <div>
      {Object.keys(props.orders).map((key) => {
        return (
          <Order
            date={props.orders[key][0]}
            key={key}
            items={props.orders[key][1]}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    orders: state.userInfo.orders,
  };
};

export default connect(mapStateToProps)(Orders);
