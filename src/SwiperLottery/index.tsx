import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow';

import './index.css';

export default function SwiperLottery(
  props: { 
    imgList: string[]; 
    slideTime: number; 
    awardIndex: number; 
    initSpeed: number;
    fastSpeed: number;
  }
) {
  const { imgList, slideTime, awardIndex, initSpeed, fastSpeed } = props;
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(initSpeed);
  const swiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    handleSlide();
  }, []);

  const handleSlide = () => {
    let direction = 1;
    let fastTime = 0;    
    const intervalId = setInterval(() => {
      setCurrentSpeed((prevSpeed) => {
        if (fastTime < 3000 && prevSpeed <= fastSpeed) {
          fastTime += 100;
          return prevSpeed;
        }
        if (prevSpeed <= fastSpeed) {
          direction = -direction;
        }
        const nextSpeed = prevSpeed - direction * 15;
        return nextSpeed;
      });
    }, 100);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      setIsAutoPlaying(false);
    }, slideTime);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }

  const handleStartButtonClick = () => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      swiperInstance.autoplay.start();
      setCurrentSpeed(initSpeed);
      setIsAutoPlaying(true);
      setShowButton(false);
      handleSlide();
    }
  };

  return (
    <div className="swiper-lottery">
      <Swiper
        ref={swiperRef}
        spaceBetween={30}
        slidesPerView={3}
        autoplay={{ delay: 0 }}
        speed={currentSpeed}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 100,
          modifier: 1,
          // slideShadows: false,
        }}
        effect={'coverflow'}
        modules={[Autoplay, EffectCoverflow]}
        loop={true}
        allowTouchMove={false}
        allowSlidePrev={false}
        onSlideChange={(swiper) => {
          if (swiper.realIndex === awardIndex && !isAutoPlaying) {
            swiper.autoplay.stop();
            setTimeout(() => {
              setShowButton(true);
            }, 500)
          }
        }}
      >
        {imgList.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} style={{ width: '100%', objectFit: 'contain' }} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      {showButton && (
        <button className="start-button" onClick={handleStartButtonClick}>
          Start
        </button>
      )}
    </div>
  );
}
