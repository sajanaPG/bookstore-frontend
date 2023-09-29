import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookCard from "./BookCard";

function Arrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "gray" }}
            onClick={onClick}
        />
    );
}

function SlickSlider({ newArrivals, setSelectedBook }) {
    const settings = {
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 1500,
        cssEase: "linear",
        pauseOnHover: true,
        initialSlide: 0,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    };

    return (
        <div>
            <h3 className="text-center mb-4 section-heading"> New Arrivals  </h3>
            <Slider {...settings}>
                {newArrivals.map(book => {
                    return (
                        <BookCard book={book} setSelectedBook={setSelectedBook} />
                    )
                })}
            </Slider>
        </div>
    )
}

export default SlickSlider;