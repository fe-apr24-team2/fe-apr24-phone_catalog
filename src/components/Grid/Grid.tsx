import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { SelectComponent } from '../../shared/ui/Select/Select';
import './Grid.scss';
import { getProducts } from '../../utils/api';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';

const SortOptions = [
  { value: 'default', label: 'Select...' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
];

const onPageCountOptions = [
  { value: 'default', label: 'Select...' },
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '30', label: '30' },
];

type Props = {
  category: string;
  pageName: string;
  pageTitle: string;
};

export const Grid: React.FC<Props> = ({ category, pageTitle, pageName }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(40);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const updateDisplayedPhones = useCallback(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedProducts(allProducts.slice(startIndex, endIndex));
  }, [itemsPerPage, currentPage, allProducts]);

  useEffect(() => {
    const loadPhones = async () => {
      try {
        const data = await getProducts();
        const onlyPhones = data.filter((item) => item.category === category);
        setAllProducts(onlyPhones);
      } catch (error) {
        throw new Error(`Error has occurred: ${error}`);
      }
    };

    loadPhones();
  }, [category]);

  useEffect(() => {
    updateDisplayedPhones();
  }, [updateDisplayedPhones]);

  const handleItemsPerPageChange = (selectedOption: { value: string }) => {
    setItemsPerPage(parseInt(selectedOption.value, 10));
    setCurrentPage(1);
  };

  const handleSortByYear = (selectedOption: { value: string }) => {
    const select = selectedOption.value;

    if (select === SortOptions[0].value) {
      return;
    }
    const itemsToSort = [...allProducts];
    const sorted = itemsToSort.sort((item1, item2) => {
      if (select === 'newest') {
        return item2.year - item1.year;
      }
      if (select === 'oldest') {
        return item1.year - item2.year;
      }
      return 0;
    });
    setAllProducts(sorted);
  };

  const getTotalPages = (
    devices: Product[],
    devicesPerPage: number,
  ): number[] => {
    const pageCount = Math.ceil(devices.length / devicesPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="component" id="top">
      <div className="component__container">
        <div className="component__path path">
          <a className="path__home-image" href="/">
            <img src="/Icons/Home.svg" alt="Home icon" />
          </a>
          <div className="path__arrow">
            <img src="/Icons/Chevron (Arrow Right).svg" alt="Arrow right" />
          </div>
          <div className="path__page">{pageName}</div>
        </div>
        <div className="component__header">
          <h1 className="component__title">{pageTitle}</h1>
        </div>
        <div className="component__models-number">
          <p>{`${allProducts.length} models`}</p>
        </div>
        <div className="component__list-params list-params">
          <span className="list-params__sort-by">
            <p className="list-params__sort-title">Sort by</p>
            <SelectComponent
              option={SortOptions}
              handleChange={handleSortByYear}
            />
          </span>
          <span className="list-params__items-on-page">
            <p className="list-params__sort-title">Items on page</p>
            <SelectComponent
              option={onPageCountOptions}
              handleChange={handleItemsPerPageChange}
            />
          </span>
        </div>
        <div className="component__wrap">
          <div className="component__list list">
            {displayedProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
        <div className="component__nav-wrap nav-wrap">
          <button
            className="nav-wrap__arrow-back"
            type="button"
            aria-label="back"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          />
          {getTotalPages(allProducts, itemsPerPage).map((page) => (
            <button
              className={classNames('nav-wrap__page', {
                active: page === currentPage,
              })}
              type="button"
              key={page}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="nav-wrap__arrow-next"
            type="button"
            aria-label="next"
            disabled={
              currentPage === getTotalPages(allProducts, itemsPerPage).length
            }
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </div>
      </div>
    </div>
  );
};
