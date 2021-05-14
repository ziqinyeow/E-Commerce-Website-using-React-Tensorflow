import React from "react";
import "boxicons";
import styled from "styled-components";
import wave from "../svg/wave2.svg";
import bag from "../svg/online-shopping.svg";
import book from "../svg/open-book.svg";
import clothing from "../svg/clothing.svg";
import computer from "../svg/desktop.svg";
import phone from "../svg/smartphone.svg";
import shoe from "../svg/sneakers.svg";
import sport from "../svg/dumbbell.svg";
import watch from "../svg/watch.svg";

function CategoriesSection() {
  return (
    <Container>
      <img className="wave" src={wave} alt="" />
      <Content>
        <Title>
          <h1>Categories</h1>
          <box-icon type="solid" name="category-alt" color="#5469d4"></box-icon>
        </Title>
        <CardsContainer>
          <CardContainer>
            <CardInnerContainer>
              <img src={bag} alt="" />
              <h5>Bags & Wallets</h5>
            </CardInnerContainer>
          </CardContainer>
          <CardContainer>
            <CardInnerContainer>
              <img src={book} alt="" />
              <h5>Books & References</h5>
            </CardInnerContainer>
          </CardContainer>
          <CardContainer>
            <CardInnerContainer>
              <img src={clothing} alt="" />
              <h5>Clothing</h5>
            </CardInnerContainer>
          </CardContainer>
          <CardContainer>
            <CardInnerContainer>
              <img src={computer} alt="" />
              <h5>Computer</h5>
            </CardInnerContainer>
          </CardContainer>
          <CardContainer>
            <CardInnerContainer>
              <img src={phone} alt="" />
              <h5>Mobile Phone</h5>
            </CardInnerContainer>
          </CardContainer>
          <CardContainer>
            <CardInnerContainer>
              <img src={shoe} alt="" />
              <h5>Shoes & Socks</h5>
            </CardInnerContainer>
          </CardContainer>
          <CardContainer>
            <CardInnerContainer>
              <img src={sport} alt="" />
              <h5>Sport Accessories</h5>
            </CardInnerContainer>
          </CardContainer>
          <CardContainer>
            <CardInnerContainer>
              <img src={watch} alt="" />
              <h5>Watches</h5>
            </CardInnerContainer>
          </CardContainer>
        </CardsContainer>
      </Content>
    </Container>
  );
}

export default CategoriesSection;

const Container = styled.div`
  width: 100%;
  min-height: 70vh;
  margin-top: 50px;
  position: relative;

  .wave {
    position: absolute;
    bottom: 0;
    z-index: 5;
  }
`;

const Content = styled.div`
  padding-left: 145px;
  width: 90%;
  position: relative;
  z-index: 10;

  @media screen and (max-width: 1295px) {
    padding-left: 80px;
  }
  @media screen and (max-width: 1056px) {
    padding-left: 90px;
  }
  @media screen and (max-width: 769px) {
    padding-left: 60px;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;

  h1 {
    font-size: 28px;
    font-weight: 600;
    color: #1a1f36;
  }

  box-icon {
    margin: 0 0 5px 20px;
    opacity: 0.5;
  }
`;

const CardsContainer = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 35px;

  @media screen and (max-width: 1295px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 1056px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const CardContainer = styled.div`
  width: 235px;
  height: 160px;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background: white;
  cursor: pointer;
  transition: all 0.5s ease;

  :hover {
    background-color: #e4e4e4;

    img {
      position: relative;
      top: -3px;
    }
  }
`;

const CardInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  img {
    width: 60px;
  }

  h5 {
    margin: 20px 0 0 0;
    font-size: 18px;
    font-weight: 600;
  }
`;
