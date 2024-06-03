import React from "react";
import Slider from "react-slick";
import { Box, IconButton, Image, Heading, Text } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

// Import slick-carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    title: "Sunshine Bliss Floral Sundress Set",
    description:
      "Radiate summer vibes with the Sunshine Bliss Floral Sundress Set.",
    src: "https://i.ibb.co/4M4VLMW/image.png",
  },
  {
    title: "Tropical Breeze Summer Ensemble",
    description: "Step into summer with the Tropical Breeze Summer Ensemble.",
    src: "https://i.ibb.co/Y7rnHBt/1.png",
  },
  {
    title: "Sunset Beach Floral Sundress",
    description:
      "Embrace the beauty of summer with the Sunset Beach Floral Sundress.",
    src: "https://i.ibb.co/L5wDyYY/3.png",
  },
];

const SlideComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <ArrowButton direction="right" />,
    prevArrow: <ArrowButton direction="left" />,
  };

  return (
    <Box
      position="relative"
      minWidth="1019px"
      minHeight="560px"
      overflow="hidden"
      width="100%"
      height="100%"
    >
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box key={index} position="relative" minHeight="560px">
            <Image
              src={slide.src}
              alt={slide.title}
              objectFit="cover"
              width="100%"
              height="100%"
            />
            <Box
              position="absolute"
              bottom="0"
              left="0"
              width="100%"
              bg="rgba(0, 0, 0, 0.6)"
              color="white"
              p="3"
              textAlign="center"
            >
              <Heading as="h2" size="lg" mb="2">
                {slide.title}
              </Heading>
              <Text>{slide.description}</Text>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

const ArrowButton = ({ direction, onClick }) => {
  return (
    <IconButton
      aria-label={`Slide ${direction}`}
      icon={direction === "right" ? <ArrowRightIcon /> : <ArrowLeftIcon />}
      position="absolute"
      top="50%"
      transform="translateY(-50%)"
      zIndex={2}
      right={direction === "right" ? "10px" : "auto"}
      left={direction === "left" ? "10px" : "auto"}
      onClick={onClick}
    />
  );
};

export default SlideComponent;
