import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { addordertolist } from "../reducer/reducer";
const NavbarContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #f8f9fa;
  padding: 10px 0;
  box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled(Link)`
  padding: 10px 20px;
  margin: 0 5px;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  color: black;
  border-radius: 5px;
`;

const Navbar = () => {
  const order = useSelector((state) => state.pizza.order);
  const currentCustomer = useSelector((state) => state.pizza.currentCustomer);
  const dispatch = useDispatch();

  const handleAddOrder = () => {
    if (order.items && order.items.length > 0) {
      dispatch(addordertolist({ ...order, currentCustomer }));
    }
  };
  return (
    <NavbarContainer>
      <Button to="/orders" onClick={handleAddOrder}>
        ADD ORDER
      </Button>
    </NavbarContainer>
  );
};

export default Navbar;
