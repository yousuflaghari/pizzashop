import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { currentCustomer } from "../reducer/reducer";

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const Detail = styled.p`
  font-size: 18px;
  color: #555;
  margin: 5px 0;
`;

const ItemDetail = styled.div`
  margin-bottom: 10px;
`;

const Cart = () => {
  const order = useSelector((state) => state.pizza.order);
  const customer = useSelector((state) => state.pizza.currentCustomer);

  const totalPrice = order.reduce((total, orderItem) => {
    return (
      total +
      orderItem.items.reduce(
        (itemTotal, item) => itemTotal + item.totalPrice,
        0
      )
    );
  }, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeCurrentCustomer = (customerName) => {
    dispatch(currentCustomer(customerName));
    navigate("/pizza-list");
  };

  return (
    <CartContainer>
      <Title>Current Customer: {customer}</Title>
      {order.map((orderItem) => (
        <>
          <Title onClick={() => changeCurrentCustomer(orderItem.customerName)}>
            Customer Name: {orderItem.customerName}
          </Title>

          {orderItem.items.map((item) => (
            <>
              <ItemDetail key={item.name}>
                <p>Name: {item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.totalPrice}</p>
              </ItemDetail>
            </>
          ))}
        </>
      ))}
      <Detail>Total Price: ${totalPrice}</Detail>
    </CartContainer>
  );
};

export default Cart;
