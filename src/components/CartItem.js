import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";

function CartItem({
  id,
  name,
  fullName,
  image,
  price,
  producedBy,
  year,
  rating,
  bcolor,
  color,
  quantity,
}) {
  const [quan, setQuantity] = useState(quantity);
  const [{ basket, user }, dispatch] = useStateValue();

  useEffect(() => {
    dispatch({
      type: "UPDATE_QUANTITY",
      item: {
        id: id,
        quantity: quan,
      },
    });
  }, [quan]);
  const IncQuantity = () => {
    setQuantity(quan + 1);
  };

  const DecQuantity = () => {
    if (quan > 1) {
      setQuantity(quan - 1);
    }
  };

  const deleteItem = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
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
          <h2>{fullName}</h2>
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
          <QuantityContainer>
            <QuantityWrap>
              <box-icon
                name="minus"
                color="#504e49"
                onClick={DecQuantity}
              ></box-icon>
              <span>{quantity}</span>
              <box-icon
                name="plus"
                color="#504e49"
                onClick={IncQuantity}
              ></box-icon>
            </QuantityWrap>
          </QuantityContainer>
        </Information>
      </ItemInformation>

      <PriceContainer>
        <PriceWrap>
          <h6>
            <span>RM </span> {(Math.round(price * quan * 100) / 100).toFixed(2)}
          </h6>
        </PriceWrap>
        <ButtonContainer onClick={deleteItem}>
          <box-icon type="solid" name="trash" color="white"></box-icon>
          <span>Delete</span>
        </ButtonContainer>
      </PriceContainer>
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
`;

const ImgContainer = styled.div`
  width: 20%;
  height: 100%;
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
`;

const Rating = styled.div``;

const QuantityContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const QuantityWrap = styled.div`
  width: 150px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #504e49;
  box-icon {
    cursor: pointer;
    border-left: 1px solid #504e49;
    border-right: 1px solid #504e49;
  }
  span {
    width: 50%;
    height: 100%;
    margin-bottom: 2px;
    color: #504e49;
    font-size: 20px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const PriceContainer = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const PriceWrap = styled.div`
  width: 30%;
  height: 36px;
  h6 {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color: #504e49;
    span {
      font-size: 10px;
    }
  }
`;

const ButtonContainer = styled.div`
  width: 30%;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #6c63ff;
  border-radius: 8px;
  cursor: pointer;
  box-icon {
    width: 18px;
    height: 18px;
    margin-right: 5px;
  }
  span {
    color: white;
    font-size: 15px;
    font-weight: 500;
  }
  :hover {
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }
`;
