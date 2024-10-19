import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import right from '../../assets/images/RightArrow.png'
import left from '../../assets/images/leftArrow.png'
import { Image } from '@chakra-ui/react'

import SlideImage from '../../assets/images/SlideImage.png'
import "./index.css"
import TestiMonialsDetails from './TestiMonialsDetails';
import BarnApi from '../../apis/barn.api';
import { useState } from 'react';
const ImageSlider = ({ }) => {
  const eventsData = [
    {
      description: "If You Need Training For Horse ",
      bgImgSrc: SlideImage,
      btnTitle2: "Read More",
      desc2: "Horse Safety Zone",
    },
    {
      description: "If You Need Training For Horse ",
      bgImgSrc: SlideImage,
      btnTitle2: "Read More",
      desc2: "Horse Safety Zone",
    },
    {
      description: "If You Need Training For Horse ",
      bgImgSrc: SlideImage,
      btnTitle2: "Read More",
      desc2: "Horse Safety Zone",
    },
    {
      description: "If You Need Training For Horse ",
      bgImgSrc: SlideImage,
      btnTitle2: "Read More",
      desc2: "Horse Safety Zone",
    },
    {
      description: "If You Need Training For Horse ",
      bgImgSrc: SlideImage,
      btnTitle2: "Read More",
      desc2: "Horse Safety Zone",
    },
  ];
  // console.log("SlideImage", eventsData);
  const swiperRef = useRef(null);
  useEffect(() => {
    swiperRef.current = new Swiper(".swiper-container", {
      grabCursor: true,
      // dots: true,
      centeredSlides: true,
      loop: true,
      zoom: {
        maxRatio: 10,
        minRatio: 1,
      },
      slidesPerView: "auto", // Set slidesPerView to 'auto' for dynamic width slides
      initialSlide: 1,
      on: {
        slideChangeTransitionEnd: function () {
          // Remove any previous active class
          const prevActiveSlide = document.querySelector(
            ".swiper-slide.active-centered-img"
          );
          if (prevActiveSlide) {
            prevActiveSlide.classList.remove("active-centered-img");
          }
          // Add active class to the current active and centered slide
          this.slides[this.activeIndex].classList.add("active-centered-img");
        },
      },
    });

    // Add active class to the initially centered slide
    swiperRef.current.slides[swiperRef.current.activeIndex].classList.add(
      "active-centered-img"
    );

    return () => {
      swiperRef.current.destroy();
    };
  }, []);

  useEffect(() => {
    let timeoutId; 
    const loopWithTimeout = () => {
      slideNext();
      timeoutId = setTimeout(loopWithTimeout, 3000);
    };
    loopWithTimeout();
    return () => clearTimeout(timeoutId);
  }, []); 

  const slidePrev = () => {
    swiperRef.current.slidePrev();
  };

  const slideNext = () => {
    swiperRef.current.slideNext();
  };

  const [loadingImages, setLoadingImages] = useState(false);
  const [barnData, setBarnData] = useState([]);
  const barnApi = new BarnApi();
  const getAllBarns = async () => {
    setLoadingImages(true);
    try {
      const BarnResponse = await barnApi.getAllBarns({});
      if (BarnResponse.data.code === 200) {
        setBarnData(BarnResponse.data.data);
        // console.log(barnData, "Success");
      } else {
        toast.error(BarnResponse.data.message);
      }
    } catch (error) {
      console.error(error);
      // toast.error("Something went wrong");
    } finally {
      setLoadingImages(false); // Once initial loading is done, set it to false
    }
  };
  useEffect(() => {
    getAllBarns();
  }, []);

  return (
    <div className="containerr">
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {eventsData.map((item, index) => {
            return (
              <div className="swiper-slide" key={index}>
                <div className="swiper-zoom-container">
                  <TestiMonialsDetails testiMonialDetail={item} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="swiper-button-next" onClick={slidePrev}>
          <Image cursor={"pointer"} src={left} alt="image" />
        </div>
        <div className="swiper-button-prev" onClick={slideNext}>
          <Image cursor={"pointer"} src={right} alt="image" />
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;