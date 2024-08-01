import { useContext, useState } from 'react';
import './Cart.scss';
import classNames from 'classnames';
import { CartContext } from '../../utils/CartContext';
import { CartItem } from '../CartItem/CartItem';

export const Cart = () => {
  const [orderDone, setOrderDone] = useState(false);

  const context = useContext(CartContext);

  if (!context) {
    throw new Error('Error has occured with context');
  }

  const { cart, clearCart } = context;

  const makeOrder = () => {
    setOrderDone(true);
    setTimeout(() => {
      clearCart();
      window.location.href = '/';
    }, 4000);
  };

  const calculatePrice = () => {
    return cart.reduce((acc, item) => {
      const newAcc = acc + item.price * item.quantity;
      return newAcc;
    }, 0);
  };

  const calculateQuantity = () => {
    return cart.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  };

  return (
    <div className="cart">
      <div className="container">
        <button
          type="button"
          className="backButton"
          onClick={() => window.history.back()}
        >
          Back
        </button>
        <h1 className="title">Cart</h1>
        <div className="interface">
          <div className="cartGrid">
            {cart.map((item) => (
              <CartItem key={item.id} product={item} />
            ))}
          </div>
          <div className="orderInterface">
            <h1 className="totalPrice">{`$${calculatePrice()}`}</h1>
            <div className="itemsCount">{`Total for ${calculateQuantity()} items`}</div>
            <div className="line" />
            <button
              type="button"
              className={classNames('checkout', {
                disabled: calculatePrice() === 0,
              })}
              onClick={makeOrder}
              disabled={calculatePrice() === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      {orderDone && (
        <div className="modal">
          <div className="modal-content ">
            <div className="doneLogo" />
            <div className="doneTitle">
              <h1 className="orderTitle">Order accepted</h1>
              <h2 className="orderTitle">Wait for our call</h2>
            </div>
            <button
              type="button"
              className="homeButton"
              aria-label="Home"
              onClick={() => {
                clearCart();
                document.body.style.overflow = '';
                window.location.href = '/';
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
