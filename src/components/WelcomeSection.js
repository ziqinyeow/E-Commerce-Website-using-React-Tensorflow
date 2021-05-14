import React, { useState } from "react";
import styled from "styled-components";
import wave from "../svg/wave.svg";
import people_cart from "../svg/people_cart.svg";
import { Link } from "react-router-dom";

function WelcomeSection() {
  const [collapse, setCollapsed] = useState(false);
  const [display, setDisplay] = useState(false);

  const handleCollapsed = () => {
    setCollapsed(true);
    setTimeout(() => {
      setDisplay(true);
    }, 1000);
  };

  return (
    <BigContainer>
      <Container
        className={collapse ? "collapsed" : ""}
        style={{ display: display ? "none" : "" }}
      >
        <LargeLogoContainer>
          <box-icon name="redux" type="logo" color="#6c63ff"></box-icon>
        </LargeLogoContainer>
        <CollapseButtonContainer onClick={handleCollapsed}>
          <box-icon
            name="chevron-up"
            color="#6c63ff"
            animation="tada-hover"
          ></box-icon>
        </CollapseButtonContainer>
        <WelcomePanel>
          {/* <img className="chart" src={chart} alt="" /> */}
          <WelcomeContent>
            <WelcomeText>
              <h1>
                Welcome to <span>ICONIZ</span> !
              </h1>
              <CaptionContainer>
                <h5>
                  The 2021 Best Online Retail Store with over <span>2B</span>{" "}
                  users in the world.
                </h5>
                <box-icon
                  name="link-external"
                  color="#434a5e"
                  animation="tada-hover"
                ></box-icon>
              </CaptionContainer>
              <ButtonsContainer>
                <ButtonContainer>
                  <Link to="/explore" style={{ textDecoration: "none" }}>
                    <button>
                      <box-icon
                        type="solid"
                        name="compass"
                        color="white"
                        animation="tada"
                      ></box-icon>
                      <span>Explore</span>
                    </button>
                  </Link>
                </ButtonContainer>
                <ButtonContainer>
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    <button>
                      <box-icon
                        name="log-in-circle"
                        color="white"
                        animation="tada"
                      ></box-icon>
                      <span>Sign Up</span>
                    </button>
                  </Link>
                </ButtonContainer>
              </ButtonsContainer>
            </WelcomeText>
            <WelcomeImg>
              <img src={people_cart} alt="" />
            </WelcomeImg>
          </WelcomeContent>
        </WelcomePanel>
      </Container>
    </BigContainer>
  );
}

export default WelcomeSection;

const BigContainer = styled.div`
  .collapsed {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const LargeLogoContainer = styled.div`
  position: absolute;
  box-icon {
    width: 300px;
    height: 300px;
    opacity: 0.15;
    transform: rotateZ(-20deg);
  }
`;

const CollapseButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 45%;
  height: 30px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius-top-left: 100%;
  border-radius-top-right: 100%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  :hover {
    background-color: #f7fafc;
  }
`;

const WelcomeImg = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 380px;
    margin-top: 45px;
  }
`;

const Container = styled.div`
  overflow: hidden;
  background-image: url(${wave});
  background-repeat: no-repeat;
  padding-bottom: 30px;
  position: relative;
  border-bottom: 1px solid #e3e8ee;
  transition: all 1s ease;

  @media screen and (max-width: 1000px) {
    ${WelcomeImg} {
      display: none;
    }
  }
`;

const WelcomePanel = styled.div`
  height: 45vh;
  position: relative;

  .chart {
    width: 100px;
    position: absolute;
    top: 30px;
    left: 30px;
    opacity: 0.1;
    transform: rotateZ(-10deg);
  }
`;

const WelcomeContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const WelcomeText = styled.div`
  line-height: 40px;
  h1 {
    font-size: 28px;
    font-weight: 600;
    color: #1a1f36;
    span {
      color: #5469d4;
      font-weight: 700;
    }
  }
  h5 {
    font-size: 15px;
    font-weight: 400;
    color: #434a5e;
    span {
      color: #5469d4;
      font-weight: 600;
    }
  }
`;

const CaptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-icon {
    height: 20px;
    width: 20px;
    text-align: center;
    cursor: pointer;
    margin: 0 0 15px 10px;
    opacity: 0.7;
    transition: all 0.5s ease;

    :hover {
      opacity: 1;
      color: black;
    }
  }
`;

const ButtonsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-right: 30px;

  button {
    min-width: 125px;
    border-radius: 5px;
    padding: 0.5rem;
    background-color: #6c63ff;
    color: white;
    border: none;
    outline: none;
    font-size: 17px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: all 0.5s ease;

    :hover {
      background-color: #514bc0;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
  }

  box-icon {
    height: 20px;
    width: 20px;
    margin-right: 5px;
    flex: 0.3;
  }
  span {
    flex: 0.7;
    text-align: left;
  }
`;
