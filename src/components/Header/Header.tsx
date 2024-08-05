import { NavLink } from 'react-router-dom';
import './index.scss';
import React, { useContext } from 'react';
import { BurgerMenu } from './BurgerMenu/BurgerMenu';
import logo from './img/logo.svg';
import { CartContext } from '../../utils/CartContext';
import { useFavorites } from '../../utils/useFavorites';

export const Header: React.FC = () => {
  const cartContext = useContext(CartContext);
  const favoritesContext = useFavorites();
  return (
    <header className="header">
      <div className="container">
        <div className="header__left">
          <a href="/" className="header__logo">
            <img src={logo} alt="Nice Gadgets logo" />
          </a>
          <nav>
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink
                  to="/"
                  className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/phones"
                  className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
                >
                  Phones
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/tablets"
                  className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
                >
                  Tablets
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/accessories"
                  className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="header__right">
            <div className="icons">
              <div className="cartAndFavoriteWrap">
                <NavLink
                  to="/favorites"
                  className={({ isActive }) => `icon icon--heart ${isActive ? 'is-active' : ''}`}
                  aria-label="Heart"
                />
                {!!favoritesContext.favorites.length && (
                  <div className="circle">
                    {favoritesContext.favorites.length}
                  </div>
                )}
              </div>
              <div className="cartAndFavoriteWrap">
                <NavLink
                  to="/cart"
                  className={({ isActive }) => `icon icon--cart ${isActive ? 'is-active' : ''}`}
                  aria-label="Cart"
                />

                {!!cartContext?.cart.length && (
                  <div className="circle">{cartContext?.cart.length}</div>
                )}
              </div>
            </div>
            <BurgerMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
