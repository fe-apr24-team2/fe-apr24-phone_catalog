// BurgerMenu.jsx
import { useState, useEffect, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './BurgerMenu.scss';
import logo from '../img/logo.svg';
import menu from '../img/menu.svg';
import closeMenu from '../img/Close.svg';
import heartLike from '../img/heartLike.svg';
import cart from '../img/cart.svg';
import { CartContext } from '../../../utils/CartContext';
import { useFavorites } from '../../../utils/useFavorites';

export const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartContext = useContext(CartContext);
  const favoritesContext = useFavorites();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <div className={`burger-menu ${isOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        className="burger-menu__icon"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={menu} alt="Menu" />
      </button>
      {isOpen && (
        <div className="burger-menu__content">
          <div className="burger-menu__header">
            <img
              src={logo}
              alt="Nice Gadgets logo"
              className="burger-menu__logo"
            />
            <a
              href="#/"
              className="burger-menu__close"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img src={closeMenu} alt="Close" />
            </a>
          </div>
          <ul className="burger-menu__list">
            <li className="burger-menu__item">
              <NavLink
                to="/"
                className={({ isActive }) => `burger-menu__link ${isActive ? 'is-active' : ''}`}
              >
                Home
              </NavLink>
            </li>
            <li className="burger-menu__item">
              <NavLink
                to="/phones"
                className={({ isActive }) => `burger-menu__link ${isActive ? 'is-active' : ''}`}
              >
                Phones
              </NavLink>
            </li>
            <li className="burger-menu__item">
              <NavLink
                to="/tablets"
                className={({ isActive }) => `burger-menu__link ${isActive ? 'is-active' : ''}`}
              >
                Tablets
              </NavLink>
            </li>
            <li className="burger-menu__item">
              <NavLink
                to="/accessories"
                className={({ isActive }) => `burger-menu__link ${isActive ? 'is-active' : ''}`}
              >
                Accessories
              </NavLink>
            </li>
          </ul>
          <div className="burger-menu__footer">
            <a
              href="/#favorites"
              className="burger-menu__icon-footer"
              aria-label="Heart"
            >
              <div className="circleWrap">
                {!!favoritesContext.favorites.length && (
                  <div className="burger-circle">
                    {favoritesContext.favorites.length}
                  </div>
                )}
                <img src={heartLike} alt="Heart" />
              </div>
            </a>
            <NavLink
              to="/cart"
              className="burger-menu__icon-footer"
              aria-label="Cart"
            >
              <div className="circleWrap">
                {!!cartContext?.cart.length && (
                  <div className="burger-circle">
                    {cartContext?.cart.length}
                  </div>
                )}
                <img src={cart} alt="Cart" />
              </div>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};
