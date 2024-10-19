import React from 'react';
import "./carousel.css";
import { Image } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons';
const TestiMonialsDetails = ({ testiMonialDetail }) => {
    const { apImg, btnTitle, description, bgImgSrc, btnTitle2, desc2 } = testiMonialDetail;
    // console.log(bgImgSrc,'bgImgSrc');
    return (
        <div className="active-image">
        
            <Image className="main-img" src={bgImgSrc} alt="image" />
            <div className="testimonial-data">
                <p className='e-desc'>{description}</p>
                <div className='btm-content'>
                    <button className='swiper-card-btn2'>
                        {btnTitle2}
                        <ArrowForwardIcon ml={2} />
                    </button>
                    <h5 className='e-desc2'style={{color:'white'}}>{desc2}</h5>
                </div>
            </div>
        </div>
    );
};

export default TestiMonialsDetails;