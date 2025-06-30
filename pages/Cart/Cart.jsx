import React, { useContext, useEffect } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    token,
    cartItems,
    food_list,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url
  } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert("Please login to view your cart.");
      navigate("/");
    }
  }, [token, navigate]);

  const total = getTotalCartAmount();

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {food_list.map(item =>
        cartItems[item._id] > 0 ? (
          <div key={item._id} className="cart-item">
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <div className="cart-item-details">
              <p>{item.name}</p>
              <p>{item.price.toFixed(2)}</p>
              <div className="cart-actions">
                <button onClick={() => removeFromCart(item._id)}>-</button>
                <span>{cartItems[item._id]}</span>
                <button onClick={() => addToCart(item._id)}>+</button>
              </div>
              <p>{(item.price * cartItems[item._id]).toFixed(2)}</p>
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          </div>
        ) : null
      )}
      <div className="cart-summary">
        <p>Subtotal: {total.toFixed(2)}</p>
        <p>Delivery Fee: {total > 0 ? 2 : 0}</p>
        <h3>Total: {(total > 0 ? total + 2 : 0).toFixed(2)}</h3>
        <button
          onClick={() => navigate("/order")}
          disabled={total === 0}
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Cart;
