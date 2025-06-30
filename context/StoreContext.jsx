import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = props => {
  const url = "http://localhost:4000";
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const fetchFoodList = async () => {
    try {
      const resp = await axios.get(`${url}/api/food/list`);
      if (resp.data?.data) setFoodList(resp.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadCartData = async tkn => {
    try {
      const resp = await axios.post(
        `${url}/api/cart/get`,
        {},
        { headers: { token: tkn } }
      );
      setCartItems(resp.data.cartData || {});
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = async itemId => {
    if (!token) {
      alert("Please login to add items to cart.");
      return;
    }
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
    await axios.post(
      `${url}/api/cart/add`,
      { itemId },
      { headers: { token } }
    );
  };

  const removeFromCart = async itemId => {
    if (!token) {
      alert("Please login to remove items from cart.");
      return;
    }
    setCartItems(prev => {
      const newCount = (prev[itemId] || 1) - 1;
      if (newCount <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newCount };
    });
    await axios.post(
      `${url}/api/cart/remove`,
      { itemId },
      { headers: { token } }
    );
  };

  const getTotalCartAmount = () =>
    Object.entries(cartItems).reduce((sum, [id, qty]) => {
      const item = food_list.find(f => f._id === id);
      return item ? sum + item.price * qty : sum;
    }, 0);

  // On mount: load food list and, if logged in, load cart
  useEffect(() => {
    (async () => {
      await fetchFoodList();
      if (token) await loadCartData(token);
    })();
  }, []);

  // Persist token in localStorage
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  return (
    <StoreContext.Provider
      value={{
        url,
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        loadCartData
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
