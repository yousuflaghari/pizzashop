import React from "react";
import styled from "styled-components";
import { incrementQuantity, decrementQuantity } from "../components/utils";
import { useSelector } from "react-redux";

// Styled components
const Containeritem = styled.div`
  text-align: center;
`;

const BackToMenu = styled.a`
  display: block;
  margin-bottom: 10px;
  color: #007bff;
  text-decoration: none;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ItemDetails = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const PizzaItem = ({ quantity, pizzaName, pizzaUserId }) => {
  return (
    <Containeritem>
      <BackToMenu href="#">Back to Menu</BackToMenu>
      <Title>Your Cart - {pizzaName}</Title>
      <ItemDetails>
        <p>
          {quantity} * {pizzaName}
          User ID: {pizzaUserId}
        </p>
      </ItemDetails>
    </Containeritem>
  );
};

export default PizzaItem;
