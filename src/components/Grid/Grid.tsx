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

const PAGES_DEFAULT = [1, 2, 3, 4];
  const [itemsPerPage, setItemsPerPage] = useState<number>(40);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagesOnScreen, setPagesOnScreen] = useState<number[]>(PAGES_DEFAULT);

  const topRef = useRef<HTMLDivElement>(null);

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
  }, [updateDisplayedPhones, pagesOnScreen]);

  const handleItemsPerPageChange = (selectedOption: { value: string }) => {
    const newItemsPerPage = parseInt(selectedOption.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    setPagesOnScreen([1, 2, 3, 4]);
  };

  const handleSortByYear = (selectedOption: { value: string }) => {
    const select = selectedOption.value;
    const sortedPhones = [...allPhones];

    if (select === 'newest') {
      sortedPhones.sort((a, b) => b.year - a.year);
    } else if (select === 'oldest') {
      sortedPhones.sort((a, b) => a.year - b.year);
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

    setCurrentPage(1);
    setPagesOnScreen([1, 2, 3, 4]);
  };

  const getTotalPages = (
    devices: Product[],
    devicesPerPage: number,
  ): number[] => {
    const pageCount = Math.ceil(devices.length / devicesPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  };

  const handlePaginationClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);

    if (topRef.current) {
      try {
        topRef.current.scrollIntoView({ behavior: 'smooth' });
      } catch (e) {
        topRef.current.scrollIntoView({ behavior: 'auto' });
      }
    }

    const totalPages = getTotalPages(allPhones, itemsPerPage);

    if (pageNumber <= totalPages[totalPages.length - 1]) {
      let startPage = 1;
      let endPage = 4;

      if (pageNumber >= 4) {
        startPage = pageNumber - 1;
        endPage = Math.min(startPage + 3, totalPages.length);
      }

      if (totalPages.length <= 4) {
        startPage = 1;
        endPage = totalPages.length;
      } else if (endPage - startPage < 3) {
        startPage = Math.max(1, endPage - 3);
      }

      const onDisplay = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i,
      );

      setPagesOnScreen(onDisplay);
    }
  };

  return (
    <div className="component" id="top" ref={topRef}>
      <div className="component__container">
        <div className="component__path path">
          <a className="path__home-image" href="home">
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
            onClick={() => handlePaginationClick(currentPage - 1)}
          />

          {getTotalPages(allProducts, itemsPerPage).map((page) => (
            <button
              className={classNames('nav-wrap__page', {
                active: page === currentPage,
              })}
              type="button"
              key={page}
              onClick={() => handlePaginationClick(page)}
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
            onClick={() => handlePaginationClick(currentPage + 1)}
          />
        </div>
      </div>
    </div>
  );
};
