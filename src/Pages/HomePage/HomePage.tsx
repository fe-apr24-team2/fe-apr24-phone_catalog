import React from 'react';
import './HomePage.scss';
import { NavLink } from 'react-router-dom';
import { RecommendedGoods } from '../../components/RecommendedGoods/RecommendedGoods';
import { HomePageSliderMain } from '../../components/HomePageSliderMain/HomePageSliderMain';

export const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <div className="homepage__title--welcome">
        <h1 className="homepage__title-h1">Welcome to Nice Gadgets store!</h1>
      </div>

      <div className="slider-container">
        <HomePageSliderMain />
      </div>

      <section className="new-models">
        <div className="recomendation-block">
          <RecommendedGoods title="Brand new models" sortType="model" />
        </div>
      </section>

      <section>
        <h2 className="homepage__title-h2">Shop by category</h2>
        <div className="categories">
          <div className="categories__items">
            <NavLink to="/phones" className="categories__item">
              <div className="categories__image categories__image--phones" />
              <div className="categories__bottom">
                <h3 className="categories__name">Mobile phones</h3>
                <p className="categories__description">95 models</p>
              </div>
            </NavLink>
            <NavLink to="/tablets" className="categories__item">
              <div className="categories__image categories__image--tablets" />
              <div className="categories__bottom">
                <h3 className="categories__name">Tablets</h3>
                <p className="categories__description">24 models</p>
              </div>
            </NavLink>

            <NavLink to="/accessories" className="categories__item">
              <div className="categories__image categories__image--accessories" />
              <div className="categories__bottom">
                <h3 className="categories__name">Accessories</h3>
                <p className="categories__description">100 models</p>
              </div>
            </NavLink>
          </div>
        </div>
      </section>

      <div className="recomendation-block">
        <RecommendedGoods title="Hot prices" sortType="price" />
      </div>
      {/* <section className="homepage__hot-prices">
      <div className="hot-prices-container" />
    </section> */}
    </div>
  );
};
