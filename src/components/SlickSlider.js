import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookCard from "./BookCard";

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, backgroundImage: "url(https://cdn-icons-png.flaticon.com/128/271/271228.png)", backgroundSize: "cover", width: "30px", height: "30px" }}
            onClick={onClick}
        />
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, backgroundImage: "url(https://cdn-icons-png.flaticon.com/128/271/271220.png)", backgroundSize: "cover", width: "30px", height: "30px" }}
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
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
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
            <h3 className="text-center mb-4 section-heading"> NEW ARRIVALS  </h3>
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