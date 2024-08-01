/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
// BurgerMenu.jsx
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './BurgerMenu.scss';

export const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <div className={`burger-menu ${isOpen ? 'is-open' : ''}`}>
      <button className="burger-menu__icon" onClick={() => setIsOpen(!isOpen)}>
        <img src="\src\components\Header\img\menu.svg" alt="Menu" />
      </button>
      {isOpen && (
        <div className="burger-menu__content">
          <div className="burger-menu__header">
            <img src="\src\components\Header\img\logo.svg" alt="Nice Gadgets logo" className="burger-menu__logo" />
            <a className="burger-menu__close" onClick={() => setIsOpen(!isOpen)}>
              <img src="\src\components\Header\img\Close.svg" alt="Close" />
            </a>
          </div>
          <ul className="burger-menu__list">
            <li className="burger-menu__item">
              <NavLink to="/" className={({ isActive }) => `burger-menu__link ${isActive ? 'is-active' : ''}`}>Home</NavLink>
            </li>
            <li className="burger-menu__item">
              <NavLink to="/phones" className={({ isActive }) => `burger-menu__link ${isActive ? 'is-active' : ''}`}>Phones</NavLink>
            </li>
            <li className="burger-menu__item">
              <NavLink to="/tablets" className={({ isActive }) => `burger-menu__link ${isActive ? 'is-active' : ''}`}>Tablets</NavLink>
            </li>
            <li className="burger-menu__item">
              <NavLink to="/accessories" className={({ isActive }) => `burger-menu__link ${isActive ? 'is-active' : ''}`}>Accessories</NavLink>
            </li>
          </ul>
          <div className="burger-menu__footer">
            <a href="heart" className="burger-menu__icon-footer" aria-label="Heart">
              <img src="\src\components\Header\img\heartLike.svg" alt="Heart" />
            </a>
            <a href="/#cart" className="burger-menu__icon-footer" aria-label="Cart">
              <img src="\src\components\Header\img\cart.svg" alt="Cart" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
