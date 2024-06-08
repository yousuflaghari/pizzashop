import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";
import { setPizzaData } from "./reducer/reducer"; // Importing setPizzaData
import Menu from "./pages/menu";
import PizzaList from "./pages/pizzalist";
import axios from "axios";
import CartDetail from "./pages/cartdetail";
import Cart from "./pages/Cart";
import Orderpage from "./pages/Orderpage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPizzaData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/recipes");

        dispatch(setPizzaData(response.data.recipes));
        console.log("pizzaapp", response.data.recipes);
      } catch (error) {
        console.error("Error fetching pizza data:", error);
      }
    };

    fetchPizzaData();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/pizza-list" element={<PizzaList />} />
        <Route path="/cartdetail" element={<CartDetail />} />
        <Route path="/orders" element={<Orderpage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
