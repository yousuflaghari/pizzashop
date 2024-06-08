import styled from "styled-components";
import Header from "../components/Header";
import Item from "../components/item";
import Navbar from "../components/Navbar";
import {
   useSelector } from "react-redux";
import Loader from "../components/loader";

const Containerlist = styled.div`
  text-align: center;
  padding-bottom: 60px;
`;

const Unorderedlistitem = styled.div`
  display: flex;
  flex-direction: column;
`;

const PizzaList = () => {
  const pizzaData = useSelector((state) => state.pizza.pizzaData);

  if (!pizzaData || pizzaData.length === 0) {
    return (
      <Containerlist>
        <Header />
        <Loader />
        <Navbar />
      </Containerlist>
    );
  }

  return (
    <Containerlist>
      <Header />
      <Unorderedlistitem>
        {pizzaData.map((pizza, index) => (
          <Item
            key={index}
            image={pizza.image}
            name={pizza.name}
            ingredients={pizza.ingredients}
            userId={pizza.userId}
          />
        ))}
      </Unorderedlistitem>
      <Navbar />
    </Containerlist>
  );
};

export default PizzaList;
