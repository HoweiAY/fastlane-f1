import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const EventCarousel = ({fullSchedule}) => {
    const navigate = useNavigate();

    const [season, setSeason] = useState(new Date().getUTCFullYear());

    const handleSelectEvent = (event) => {
        const round = event.round;
        const location = event.location.replace(/ /g, '_');
        navigate(`/event/${season}/${round}/${location}`);
    };

    const settings = {
        arrows: true,
        dots: false,
        lazyLoad: true,
        infinite: true,
        centerMode: true,
        centerPadding: "10px",
        adaptiveHeight: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextEventArrow />,
        prevArrow: <PrevEventArrow />
    };

    return (
        <Slider {...settings}>
            {fullSchedule.map((event) => 
                <EventCard 
                    key={event.dateFormatted}
                    event={event} 
                    onClick={(event) => handleSelectEvent(event)}
                    stylized={false}
                />
            )}
        </Slider>
    );
  }

export default EventCarousel;