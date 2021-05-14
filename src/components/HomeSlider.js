import React, { useState } from "react";
import styled from "styled-components";
import "boxicons";

const photos = [
  {
    url: "https://icms-image.slatic.net/images/ims-web/c7d94659-af07-4498-ad49-befa8db2014d.jpg",
  },
  {
    url: "https://icms-image.slatic.net/images/ims-web/de05edb4-5dbe-471a-923f-ffafb580b072.jpg",
  },
  {
    url: "https://icms-image.slatic.net/images/ims-web/be202271-1932-4abd-bde3-b73503577adc.jpg",
  },
];

function HomeSlider() {
  const [current, setCurrent] = useState(0);
  const length = photos.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(photos) || photos.length <= 0) {
    return null;
  }

  return (
    <Container>
      <LeftArrow>
        <box-icon
          type="solid"
          name="chevron-left-circle"
          color="#c6ccdb"
          animation="tada-hover"
          onClick={prevSlide}
        ></box-icon>
      </LeftArrow>
      <RightArrow>
        <box-icon
          name="chevron-right-circle"
          type="solid"
          color="#c6ccdb"
          animation="tada-hover"
          onClick={nextSlide}
        ></box-icon>
      </RightArrow>
      {photos.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && <img src={slide.url} alt={index} />}
          </div>
        );
      })}
    </Container>
  );
}

export default HomeSlider;

const Container = styled.div`
  position: relative;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  box-icon {
    width: 30px;
    height: 30px;
  }

  .slide {
    opacity: 0.3;
    transform: translate(0, -10%);
    transition-duration: 1s ease;
  }

  .slide.active {
    opacity: 1;
    transition-duration: 1s;
    transform: scale(1.001) translate(0);
  }

  img {
    width: 85%;
    height: 380px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.5s ease;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    :hover {
      transform: scale(1.02);
      box-shadow: 2px 2px 26px 0px rgba(0, 0, 0, 0.3);
    }
  }
`;

const LeftArrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 32px;
  font-size: 3rem;
  z-index: 10;
  cursor: pointer;
  user-select: none;
`;

const RightArrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  right: 32px;
  font-size: 3rem;
  z-index: 10;
  cursor: pointer;
  user-select: none;
`;
