/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './ItemSlider.scss';
import React, { useCallback, useEffect, useState } from 'react';

type Props = {
  images: string[] | undefined;
};

export const ItemSlider: React.FC<Props> = ({ images }) => {
  const [mainPhoto, setMainPhoto] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isFading, setIsFading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 639);

  const handleClick = useCallback((photo: string) => {
    setIsFading(true);
    setTimeout(() => {
      setMainPhoto(photo);
      setSelectedPhoto(photo);
      setIsFading(false);
    }, 300);
  }, []);

  const getFirstPhoto = useCallback(() => {
    if (images && images.length > 0) {
      setMainPhoto(images[0]);
      setSelectedPhoto(images[0]);
    } else {
      setMainPhoto(null);
      setSelectedPhoto(null);
    }
  }, [images]);

  useEffect(() => {
    getFirstPhoto();
  }, [getFirstPhoto]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 639);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!images || images.length === 0) {
    return <div>No photos</div>;
  }

  if (!mainPhoto) {
    return <div>No main photo</div>;
  }

  return (
    <div className="slider">
      <div className="slider__preview-pictures">
        <Swiper
          spaceBetween={16}
          direction={isMobile ? 'horizontal' : 'vertical'}
          slidesPerView={4}
          freeMode
        >
          {images.map((photo) => (
            <SwiperSlide key={photo}>
              <img
                className={`slider__preview-pictures-img ${
                  selectedPhoto === photo ? 'selected' : ''
                }`}
                src={photo}
                alt=""
                onClick={() => handleClick(photo)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="slider__main-photo">
        <img
          className={`slider__main-photo-img ${isFading ? 'hidden' : ''}`}
          src={mainPhoto}
          alt=""
        />
      </div>
    </div>
  );
};
