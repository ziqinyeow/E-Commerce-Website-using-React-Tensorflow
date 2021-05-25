import React from "react";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";

function CartItem({
  key,
  id,
  name,
  fullName,
  image,
  price,
  producedBy,
  year,
  rating,
}) {
  const [{ basket, user }, dispatch] = useStateValue();

  const deleteItem = () => {
    dispatch({
      type: "REMOVE_FROM_SAVED",
      item: {
        id: id,
      },
    });
  };
  return (
    <Container>
      <ImgContainer>
        <img src={image} alt="" />
      </ImgContainer>
      <ItemInformation>
        <Information>
          <h2>{name}</h2>
          <h3>{producedBy}</h3>
          <h4>{year}</h4>
          <Rating>
            {Array(rating)
              .fill()
              .map((_, i) => (
                <box-icon type="solid" name="star" color="#737373"></box-icon>
              ))}
            {Array(5 - rating)
              .fill()
              .map((_, i) => (
                <box-icon name="star" color="#737373"></box-icon>
              ))}
          </Rating>
        </Information>
      </ItemInformation>
      <PriceContainer>
        <PriceWrap>
          <h6>
            <span>RM </span> {(Math.round(price * 100) / 100).toFixed(2)}
          </h6>
        </PriceWrap>
        <ButtonContainer onClick={deleteItem}>
          <box-icon
            type="solid"
            name="trash"
            color="#504e49"
            animation="tada-hover"
          ></box-icon>
        </ButtonContainer>
        <ShareContainer>
          <box-icon
            name="share-alt"
            type="solid"
            color="#504e49"
            animation="tada-hover"
          ></box-icon>
        </ShareContainer>
      </PriceContainer>
      <Line></Line>
    </Container>
  );
}

export default CartItem;

const Container = styled.div`
  margin: 20px 0;
  width: 87%;
  height: 230px;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  position: relative;
`;

const ImgContainer = styled.div`
  width: 20%;
  height: 100%;
  margin-right: 30px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
`;

const ItemInformation = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Information = styled.div`
  width: 90%;
  height: 80%;
  h2 {
    font-size: 22px;
    font-weight: 700;
    color: #504e49;
  }
  h3 {
    font-size: 17px;
    font-weight: 300;
    color: #504e49;
  }
  h4 {
    font-size: 14px;
    font-weight: 300;
    color: #504e49;
  }
`;

const Rating = styled.div`
  box-icon {
    width: 15px;
    height: 15px;
  }
`;

const PriceContainer = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;

const PriceWrap = styled.div`
  width: 200px;
  height: 36px;
  h6 {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    color: #504e49;
    span {
      font-size: 10px;
    }
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 25px;
  right: 30px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #f3f3f3;
  transition: all 0.5s ease;

  box-icon {
    width: 18px;
    height: 18px;
  }
  :hover {
    background-color: #e4e4e4;
  }
`;

const ShareContainer = styled.div`
  position: absolute;
  top: 25px;
  right: 70px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #f3f3f3;
  transition: all 0.5s ease;

  box-icon {
    width: 18px;
    height: 18px;
  }
  :hover {
    background-color: #e4e4e4;
  }
`;

const Line = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 10px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  background: linear-gradient(
    180deg,
    rgba(236, 248, 255, 1) 0%,
    rgba(120, 159, 255, 0.8018557764902836) 100%
  );
`;
