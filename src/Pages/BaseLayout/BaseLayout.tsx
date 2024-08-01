/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useCallback, useContext, useEffect, useState } from 'react';
import './BaseLayout.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Device } from '../../types/Device';
import { getPhones, getProducts } from '../../utils/api';
import { CartContext } from '../../utils/CartContext';
import { Product } from '../../types/Product';
import { ItemSlider } from '../../components/ItemCard-slider/ItemSlider';
import { RecommendedGoods } from '../../components/RecommendedGoods/RecommendedGoods';

export const BaseLayout = () => {
  const [phone, setPhone] = useState<Device>();
  const [product, setProduct] = useState<Product | undefined>();
  const context = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();

  if (!context) {
    throw new Error('context is not defined');
  }

  const { cart, addToCart } = context;

  const inCart = cart.find((el) => el.itemId === phone?.id);

  const loadPhones = useCallback(async () => {
    try {
      const result = await getPhones();
      setPhone(
        result.find((device) => location.pathname.split('/').includes(device.id)),
      );
    } catch {
      throw new Error('Failed loading phone');
    }
  }, [location.pathname]);

  useEffect(() => {
    loadPhones();
    window.scrollTo(0, 0);
  }, [location, loadPhones]);

  const getProduct = useCallback(async () => {
    try {
      const products = await getProducts();
      const productId = location.pathname.split('/').pop();

      const result = products.find((el) => el.itemId === productId);

      if (!result) {
        throw new Error('Product does not exist');
      }

      setProduct(result);
    } catch (error) {
      throw new Error('Error fetching product:');
    }
  }, [location.pathname]);

  useEffect(() => {
    getProduct();
  }, [location, getProduct]);

  const activeColor = () => {
    const currentColor = location.pathname.split('-');
    return currentColor[currentColor.length - 1];
  };

  const activeCapacity = () => {
    const currentCapacity = location.pathname.split('-');
    return currentCapacity[currentCapacity.length - 2].toUpperCase();
  };

  const home = () => {
    window.location.href = '/';
  };

  const phonesLink = () => {
    window.location.href = '#/phones';
  };

  const redirectByColor = (color: string) => {
    const pathSegments = location.pathname.split('-');
    pathSegments[pathSegments.length - 1] = color;
    const newPath = pathSegments.join('-');
    navigate(newPath);
    window.location.reload();
  };

  const redirectByRAM = (capacity: string) => {
    const pathSegments = location.pathname.split('-');
    pathSegments[pathSegments.length - 2] = capacity.toLowerCase();
    const newPath = pathSegments.join('-');
    navigate(newPath);
    window.location.reload();
  };

  return (
    <div className="baseLayout" id="top">
      <div className="baseContainer">
        <div className="basePath">
          <div className="home" onClick={home} style={{ cursor: 'pointer' }} />
          <div className="arrow" />
          <div
            className="category"
            onClick={phonesLink}
            style={{ cursor: 'pointer' }}
          >
            Phones
          </div>
          <div className="arrow" />
          <div className="model">{phone?.name}</div>
        </div>

        <button type="button" className="backButton">
          Back
        </button>

        <h1 className="modelName">{phone?.name}</h1>
        <div className="modelContainer">
          <div className="sliderContainer">
            <ItemSlider images={phone?.images} />
          </div>
          <div className="selectModel">
            <div className="colorsAvaible">
              <p className="avaible">Avaible colors</p>
              <div className="colors">
                {phone?.colorsAvailable.map((color) => (
                  <div
                    className={`color ${color} ${activeColor() === color ? 'activeColor' : ''}`}
                    key={color}
                    onClick={() => redirectByColor(color)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
            </div>

            <div className="line" />

            <div className="capacity">
              <div className="avaible">Select capacity</div>
              <div className="chooseCapacity">
                {phone?.capacityAvailable.map((capacity) => (
                  <div
                    className={`ram ${capacity === activeCapacity() ? 'activeCapacity' : ''}`}
                    key={capacity}
                    onClick={() => redirectByRAM(capacity)}
                    style={{ cursor: 'pointer' }}
                  >
                    {capacity}
                  </div>
                ))}
              </div>
            </div>

            <div className="line" />

            <div className="modelPrice">
              <p className="product_price__discount">{`$${phone?.priceDiscount}`}</p>
              <p className="product_price__regular">{`$${phone?.priceRegular}`}</p>
            </div>

            <div className="actionButtons">
              <button
                type="button"
                className={classNames('addToCart', {
                  added: inCart?.itemId === phone?.id,
                })}
                onClick={() => {
                  if (product) {
                    addToCart(product);
                  }
                }}
              >
                {inCart?.itemId === phone?.id ? 'Added' : 'Add to cart'}
              </button>
              <button
                type="button"
                className="addToFavorite"
                aria-label="addToFavorite"
              />
            </div>

            <div className="info">
              <div className="screen">
                <span className="infoTitle">Screen</span>
                <span className="modelInfo">{phone?.screen}</span>
              </div>
              <div className="resolution">
                <span className="infoTitle">Resolution</span>
                <span className="modelInfo">{phone?.resolution}</span>
              </div>
              <div className="processor">
                <span className="infoTitle">Processor</span>
                <span className="modelInfo">{phone?.processor}</span>
              </div>
              <div className="memory">
                <span className="infoTitle">RAM</span>
                <span className="modelInfo">{phone?.ram}</span>
              </div>
            </div>
          </div>

          <div className="modelId">ID: 802390</div>
        </div>

        <div className="infoBlocks">
          <div className="aboutInfo">
            <h1 className="blockTitle">About</h1>

            <div className="breakLine" />

            {phone?.description.map((el) => (
              <div key={el.title} className="general">
                <h1 className="infoHead">{el.title}</h1>
                <div className="infoFilling">
                  {el.text.map((text) => (
                    <p key={text.length}>{text}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="techSpecsInfo">
            <h1 className="blockTitle">Tech specs</h1>

            <div className="breakLine" />

            <div className="techspecsWrapper">
              <div className="wrap">
                <li className="disableList">
                  <p className="techTitle">Screen</p>
                  <p className="spec">{phone?.screen}</p>
                </li>
                <li className="disableList">
                  <p className="techTitle">Resolution</p>
                  <p className="spec">{phone?.resolution}</p>
                </li>
                <li className="disableList">
                  <p className="techTitle">Processor</p>
                  <p className="spec">{phone?.processor}</p>
                </li>
                <li className="disableList">
                  <p className="techTitle">RAM</p>
                  <p className="spec">{phone?.ram}</p>
                </li>
                <li className="disableList">
                  <p className="techTitle">Built in memory</p>
                  <p className="spec">{phone?.capacity}</p>
                </li>
                <li className="disableList">
                  <p className="techTitle">Camera</p>
                  <p className="spec">{phone?.camera}</p>
                </li>
                <li className="disableList">
                  <p className="techTitle">Zoom</p>
                  <p className="spec">{phone?.zoom}</p>
                </li>
                <li className="disableList">
                  <p className="techTitle">Cell</p>
                  <p className="spec">{phone?.cell.join(', ')}</p>
                </li>
              </div>
            </div>
          </div>
        </div>
        <RecommendedGoods price={phone?.priceDiscount} />
      </div>
    </div>
  );
};
