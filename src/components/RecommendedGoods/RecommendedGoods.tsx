import React, { useCallback, useEffect, useState } from 'react';
import './RecommendedGoods.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { getProducts } from '../../utils/api';
import { Product } from '../../types/Product';

type Props = {
  title: string
  sortType: 'model' | 'price'
}

// write it in the right component
// <RecommendedGoods title="Brand new models" sortType="model" />
// <RecommendedGoods title="Hot prices" sortType="price" />

export const RecommendedGoods: React.FC<Props> = ({ title, sortType }) => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sortByNewestModels = (a: Product, b: Product) => {
    const getModalNumber = (name: string) => {
      const modelPriorities: { [key: string]: number } = {
        XS: 10,
        XR: 9,
      };

      const match = name.match(/(\d+|XS|XR)/);

      if (match) {
        const value = match[0];
        if (modelPriorities[value] !== undefined) {
          return modelPriorities[value];
        }

        return parseInt(value, 10);
      }

      return -1;
    };

    const getModalPriority = (name: string) => {
      const priorities: { [key: string]: number } = {
        'Pro Max': 4,
        Pro: 3,
        Plus: 2,
        Mini: 1,
      };

      const priorityKey = Object.keys(priorities).find((key) => name.includes(key));

      return priorityKey ? priorities[priorityKey] : 0;
    };

    const modelNumberA = getModalNumber(a.name);
    const modelNumberB = getModalNumber(b.name);

    if (modelNumberA !== modelNumberB) {
      return modelNumberB - modelNumberA;
    }
    return getModalPriority(b.name) - getModalPriority(a.name);
  };

  const sortByPriceDifference = (a: Product, b: Product) => {
    const priceDiffA = a.fullPrice - a.price;
    const priceDiffB = b.fullPrice - b.price;

    return priceDiffB - priceDiffA;
  };

  const fetchPhones = useCallback(async () => {
    try {
      const phonesData = await getProducts();
      const onlyPhones = phonesData.filter((item) => item.category === 'phones');
      let sortedPhones = onlyPhones;

      if (sortType === 'model') {
        sortedPhones = onlyPhones
          .filter((phone) => phone.capacity === '128GB')
          .sort(sortByNewestModels);
      }

      if (sortType === 'price') {
        sortedPhones = onlyPhones
          .filter((phone) => phone.price < 1000)
          .sort(sortByPriceDifference);
      }

      setPhones(sortedPhones);
    } catch (error) {
      throw new Error(`Failed to fetch phones: ${error}`);
    }
  }, [sortType]);

  useEffect(() => {
    fetchPhones();
  }, [fetchPhones]);

  const getVisibleItems = () => {
    if (window.innerWidth <= 480) {
      return 2;
    }

    if (window.innerWidth <= 768) {
      return 3;
    }

    return 4;
  };

  const getItemsPerPage = () => {
    const visibleItems = getVisibleItems();

    return visibleItems + 0.5;
  };

  const itemsPerPage = getItemsPerPage();
  const itemsRemaining = phones.length - (currentIndex + itemsPerPage);

  const isDisabledBack = currentIndex <= 0;
  const isDisabledNext = itemsRemaining <= 0;

  const moveSlides = (direction: number) => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      if (newIndex < 0) return 0;
      if (newIndex > phones.length) {
        return phones.length - 1;
      }
      return newIndex;
    });
  };

  const handleNextClick = () => {
    if (!isDisabledNext) {
      moveSlides(1);
    }
  };

  const handlePrevClick = () => {
    if (!isDisabledBack) {
      moveSlides(-1);
    }
  };

  return (
    <>
      <div className="recommended">
        <h1 className="recommended_title">{title}</h1>
        <div className="recommended_buttons">
          <button
            className="recommended_arrow"
            type="button"
            disabled={isDisabledBack}
            onClick={handlePrevClick}
          >
            <img
              className="recommended_arrow__left-default"
              src="/Icons/Chevron (Arrow Left).svg"
              alt="arrow left default"
            />
            <img
              className="recommended_arrow__left"
              src="/Icons/Chevron (Arrow Right)Dark.svg"
              alt="arrow left"
            />
          </button>
          <button
            className="recommended_arrow"
            type="button"
            disabled={isDisabledNext}
            onClick={handleNextClick}
          >
            <img
              className="recommended_arrow__right-default"
              src="/Icons/Chevron (Arrow Left).svg"
              alt="arrow right default"
            />
            <img
              className="recommended_arrow__right"
              src="/Icons/Chevron (Arrow Right)Dark.svg"
              alt="arrow right"
            />
          </button>
        </div>
      </div>

      <div className="goods">
        {phones
          .slice(currentIndex, currentIndex + getItemsPerPage())
          .map((phone) => (
            <ProductCard
              key={phone.id}
              phone={phone}
            />
          ))}
      </div>
    </>
  );
};
