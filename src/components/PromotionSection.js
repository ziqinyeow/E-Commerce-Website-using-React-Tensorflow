import React, { useState } from "react";
import styled from "styled-components";
import wave from "../svg/wave3.svg";

function PromotionSection() {
  const today = new Date().getDay();
  const dayArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const monthArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var year = new Date().getFullYear();
  var month = monthArr[new Date().getMonth()];
  var date = new Date().getDate();
  var string = month + " " + date + ", " + year + " 22:00:00";
  var countDownDate = new Date(string).getTime();

  var x = setInterval(function () {
    var now = new Date().getTime();

    var distance = countDownDate - now;

    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    setHour(hours);
    setMinute(minutes);
    setSecond(seconds);

    if (distance < 0) {
      clearInterval(x);
      setHour(0);
      setMinute(0);
      setSecond(0);
    }
  }, 1000);

  return (
    <Container>
      <img className="wave" src={wave} alt="" />
      <PromotionContainer>
        <DailyPromotionContainer>
          <Text>
            <h1>
              {dayArr[today]}'s <span>Promotions</span>
            </h1>
            <h3>
              <box-icon name="timer" color="#ffffff"></box-icon>
              <span>
                Time remaining: {hour} : {minute} : {second}
              </span>
            </h3>
          </Text>
          <ViewAllPromoButton>
            <button>
              <box-icon
                type="solid"
                name="bookmark-alt"
                color="white"
                animation="tada"
              ></box-icon>
              <span>View All</span>
            </button>
          </ViewAllPromoButton>
        </DailyPromotionContainer>
        <ItemContainer></ItemContainer>
      </PromotionContainer>
    </Container>
  );
}

export default PromotionSection;

const Container = styled.div`
  width: 100%;
  min-height: 50vh;
  position: relative;

  .wave {
    position: absolute;
    top: 0;
    z-index: 1;
  }
`;

const PromotionContainer = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const DailyPromotionContainer = styled.div`
  padding: 0 30px;
  background: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  width: 87%;
  height: 10vh;
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 27px;
    font-weight: 600;
    color: #1a1f36;
    span {
      color: #6c63ff;
    }
  }
  h3 {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    font-weight: 600;
    background-color: #6c63ff;
    color: white;
    border-radius: 8px;
    box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
    box-icon {
      margin-right: 5px;
    }
  }

  @media screen and (max-width: 937px) {
    h3 {
      font-size: 15px;
    }
  }
  @media screen and (max-width: 875px) {
    h3 {
      font-size: 10px;
      margin-right: 10px;
    }
  }
`;

const ViewAllPromoButton = styled.div`
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
`;

const ItemContainer = styled.div`
  height: 50vh;
  width: 87%;
  margin-top: 50px;
  position: relative;
  z-index: 15;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;
