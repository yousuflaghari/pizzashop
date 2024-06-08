import React from "react";
const Cartitem = ({ item }) => {
  return (
    <>
      <p>
        {item.quantity} * {item.name}
      </p>
      <p> ${item.userId * item.quantity}</p>
    </>
  );
};
export default Cartitem;
