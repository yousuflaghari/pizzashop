import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import CartItem from "../components/Cartitem";
import {
  selectOrdersByBookerName,
  selectTotalPriceByBookerName,
} from "../reducer/reducer";

const Container = styled.div`
  text-align: center;
  padding-bottom: 60px;
`;

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OrderItem = styled.div`
  width: 600px;
  display: flex;
  justify-content: space-between;
  font-size: large;
  font-family: cursive;
`;

const BackToMenuLink = styled(Link)`
  display: inline-block;
  margin: 20px 0;
  padding: 10px 20px;
  color: #007bff;
  text-decoration: none;
`;

const CartDetail = () => {
  const inputName = useSelector((state) => state.pizza.inputName);
  const orders = useSelector(selectOrdersByBookerName(inputName));
  const totalPrice = useSelector(selectTotalPriceByBookerName(inputName));

  return (
    <Container>
      <Header />
      <BackToMenuLink to="/pizza-list">Back to Menu</BackToMenuLink>
      <h1>Your cart, {inputName}</h1>
      <OrderList>
        {orders.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          orders.map((item, index) => (
            <OrderItem key={index}>
              <CartItem item={item}></CartItem>
            </OrderItem>
          ))
        )}
      </OrderList>
      <div>Total Price: ${totalPrice}</div>
      <Link to="/orderpage">Go to Order</Link>
      <Navbar />
    </Container>
  );
};

export default CartDetail;
