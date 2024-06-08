import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { addordertolist } from "../reducer/reducer";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #facc15;
  height: 55px;
`;

const OrderingSearchbar = styled.input`
  padding: 8px 16px;
  font-size: 21px;
  border: 1px solid #ccc;
  border-radius: 30px;
  background-color: #fef9c3;
`;

const UserName = styled.div`
  font-size: 20px;
  font-family: monospace;
  color: #44403c;
  margin-left: 20px;
  display: contents;
`;

const BackToMenuLink = styled(Link)`
  display: inline-block;
  margin: 20px 0;
  padding: 10px 20px;
  color: #007bff;
  text-decoration: none;
`;

const Header = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.pizza.order.customerName);
  const location = useLocation();

  const handleMenuClick = () => {
    dispatch(addordertolist());
  };

  return (
    <HeaderContainer>
      <div>
        <BackToMenuLink to="/" onClick={handleMenuClick}>
          Menu
        </BackToMenuLink>
        <BackToMenuLink to="/pizza-list">Pizzalist</BackToMenuLink>
        <BackToMenuLink to="/cart">Cart </BackToMenuLink>
      </div>

      <OrderingSearchbar placeholder="Search order #" />
      {location.pathname === "/pizza-list" && userName && (
        <UserName>{userName}</UserName>
      )}
    </HeaderContainer>
  );
};

export default Header;
