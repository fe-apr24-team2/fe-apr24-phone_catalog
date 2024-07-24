import './header.scss';
import './reset.scss';
export const Header = () => {
  return (
    <body>
      <header className="header">
        <div className="container">
          <div className="header__content">
            <a href="home" className="header__logo">
              <img src="./LogoNiceGadgets.svg" alt="Nice Gadgets logo" />
            </a>

            <nav className="nav">
              <ul className="nav__list">
                <li className="nav__item">
                  <a href="home" className="nav__link">
                    home
                  </a>
                </li>

                <li className="nav__item">
                  <a href="phones" className="nav__link">
                    phones
                  </a>
                </li>

                <li className="nav__item">
                  <a href="tablets" className="nav__link">
                    tablets
                  </a>
                </li>

                <li className="nav__item">
                  <a href="accessories" className="nav__link">
                    accessories
                  </a>
                </li>
              </ul>
            </nav>

            <div className="top-bar__icons">
              <a href="heart" className="icon icon--heart"></a>

              <a href="cart" className="icon icon--cart"></a>
            </div>
          </div>
        </div>
      </header>
    </body>
  );
};
