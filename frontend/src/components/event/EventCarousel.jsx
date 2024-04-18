import { useState } from "react";
import Slider from "react-slick";
import { IconContext } from "react-icons";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";

import EventCard from "./EventCard";

const NextEventArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <IconContext.Provider value={{ color: "black" }}>
                <GoChevronRight className={className} />
            </IconContext.Provider>
        </div>
    );
};
  
const PrevEventArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <IconContext.Provider value={{ color: "black" }}>
                <GoChevronLeft className={className} />
            </IconContext.Provider>
        </div>
    );
}

const EventCarousel = ({fullSchedule, round}) => {
    const [season, setSeason] = useState(new Date().getUTCFullYear());

    const settings = {
        arrows: true,
        dots: false,
        lazyLoad: true,
        infinite: true,
        centerMode: true,
        centerPadding: "6px",
        adaptiveHeight: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: round ? round : 0,
        nextArrow: <NextEventArrow />,
        prevArrow: <PrevEventArrow />
    };

    return (
        <Slider {...settings}>
            {fullSchedule.map((event) => 
                <EventCard 
                    key={event.dateFormatted}
                    event={event} 
                    stylized={false}
                />
            )}
        </Slider>
    );
  }

export default EventCarousel;