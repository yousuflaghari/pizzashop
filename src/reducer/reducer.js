import { createSlice } from "@reduxjs/toolkit";

const pizzaSlice = createSlice({
  name: "pizza",
  initialState: {
    currentCustomer: "", // Assuming a default customer for demonstration
    pizzaData: [],
    order: [],
    orderlist: [],
    userId: "",
  },
  reducers: {
    addordertolist: (state, action) => {
      state.orderlist.push({ ...action.payload });
    },

    currentCustomer: (state, action) => {
      state.currentCustomer = action.payload;
    },
    setPizzaData: (state, action) => {
      state.pizzaData = action.payload;
    },
    addToOrder: (state, action) => {
      state.order.push({
        customerName: action.payload.customerName,
        items: [action.payload.item],
      });
    },
    updateQuantity: (state, action) => {
      const { name, userId, quantity, price } = action.payload;
      const customerName = state.currentCustomer;
      const orderIndex = state.order.findIndex(
        (order) => order.customerName === customerName
      );
      if (orderIndex !== -1) {
        const itemIndex = state.order[orderIndex].items.findIndex(
          (item) => item.name === name && item.userId === userId
        );
        if (itemIndex !== -1) {
          const updatedItems = [...state.order[orderIndex].items];
          updatedItems[itemIndex] = {
            ...updatedItems[itemIndex],
            quantity: quantity,
            totalPrice: quantity * price,
          };
          state.order[orderIndex].items = updatedItems;
        }
      }
    },
    addItemToOrder: (state, action) => {
      const { name, quantity, price, userId } = action.payload;
      const customerName = state.currentCustomer;
      const orderIndex = state.order.findIndex(
        (order) => order.customerName === customerName
      );
      if (orderIndex !== -1) {
        const itemIndex = state.order[orderIndex].items.findIndex(
          (item) => item.name === name && item.userId === userId
        );
        if (itemIndex !== -1) {
          // Item already exists, increase the quantity
          state.order[orderIndex].items[itemIndex].quantity += 1;
          state.order[orderIndex].items[itemIndex].totalPrice =
            state.order[orderIndex].items[itemIndex].quantity * price;
        } else {
          // Item does not exist, add as new
          state.order[orderIndex].items.push({
            name,
            quantity,
            userId,
            totalPrice: quantity * price,
          });
        }
      } else {
        // Order does not exist, create a new order
        state.order.push({
          customerName,
          items: [
            {
              name,
              quantity,
              userId,
              totalPrice: quantity * price,
            },
          ],
        });
      }
    },
    removeItemFromOrder: (state, action) => {
      const { name, userId } = action.payload;
      const customerName = state.currentCustomer;
      const orderIndex = state.order.findIndex(
        (order) => order.customerName === customerName
      );
      if (orderIndex !== -1) {
        const itemIndex = state.order[orderIndex].items.findIndex(
          (item) => item.name === name && item.userId === userId
        );
        if (itemIndex !== -1) {
          state.order[orderIndex].items.splice(itemIndex, 1);
          if (state.order[orderIndex].items.length === 0) {
            state.order.splice(orderIndex, 1);
          }
        }
      }
    },
  },
});

export const {
  setPizzaData,
  addToOrder,
  updateQuantity,
  addItemToOrder,
  currentCustomer,
  removeItemFromOrder,
  addordertolist,
} = pizzaSlice.actions;

export default pizzaSlice.reducer;

// Selectors
export const selectOrdersByBookerName = (bookername) => (state) => {
  const order = state.pizza.order.find(
    (order) => order.customerName === bookername
  );
  return order ? order.items : [];
};

export const selectPizzaQuantity = (name, userId) => (state) => {
  const orderItems = state.pizza.order.reduce((acc, order) => {
    const item = order.items.find(
      (item) => item.name === name && item.userId === userId
    );
    if (item) acc.push(item);
    return acc;
  }, []);
  return orderItems.length > 0 ? orderItems[0].quantity : 1;
};

export const selectTotalPriceByBookerName = (bookername) => (state) => {
  const order = state.pizza.order.find(
    (order) => order.customerName === bookername
  );
  if (!order) return 0;
  return order.items.reduce((total, item) => total + item.totalPrice, 0);
};
