import React from "react";
import { useStateValue } from "../StateProvider";
import styled from "styled-components";
import "boxicons";

function ProductCard({
  id,
  name,
  fullName,
  description,
  image,
  price,
  producedBy,
  year,
  rating,
  bcolor,
  color,
}) {
  const [{ user }, dispatch] = useStateValue();
  const AddToCart = (e) => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        name: name,
        fullName: fullName,
        description: description,
        image: image,
        price: price,
        producedBy: producedBy,
        year: year,
        rating: rating,
        bcolor: bcolor,
        color: color,
        quantity: 1,
      },
    });
    e.preventDefault();
  };

  const Saved = (e) => {
    dispatch({
      type: "ADD_TO_SAVED",
      item: {
        id: id,
        name: name,
        fullName: fullName,
        description: description,
        image: image,
        price: price,
        producedBy: producedBy,
        year: year,
        rating: rating,
        bcolor: bcolor,
        color: color,
        quantity: 1,
      },
    });
    e.preventDefault();
  };

  return (
    <Container>
      <Line></Line>
      <ImageContainer bcolor={bcolor}>
        <img src={image} alt="product" />
      </ImageContainer>
      <ContentContainer>
        <Wrap>
          <TextContainer>
            <h4>{name}</h4>
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
            <h6>
              <span>RM</span> {(Math.round(price * 100) / 100).toFixed(2)}
            </h6>
          </TextContainer>
          <BigButtonContainer>
            <ButtonContainer>
              <AddToCartContainer onClick={AddToCart}>
                <box-icon
                  type="solid"
                  name="cart-add"
                  color="#504e49"
                  animation="tada-hover"
                ></box-icon>
                <span>Add To Cart</span>
              </AddToCartContainer>
              <SavedContainer onClick={Saved}>
                <box-icon
                  name="heart"
                  color="#6b63ffcc"
                  animation="tada-hover"
                ></box-icon>
              </SavedContainer>
            </ButtonContainer>
          </BigButtonContainer>
        </Wrap>
      </ContentContainer>
    </Container>
  );
}

export default ProductCard;

const Container = styled.div`
  width: auto;
  height: 338px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  margin-bottom: 30px;
  cursor: pointer;
  background-color: white;
  transition: all 0.5s ease;
  :hover {
  }
`;

const Line = styled.div`
  height: 7px;
  background-color: #333438ce;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  transition: all 0.5s ease;

  background: linear-gradient(120deg, #b2aeff8e, #9892ffbd, #6b63ffc7 50%);
`;

const ImageContainer = styled.div`
  height: 50%;
  background-color: ${(props) => props.bcolor};
  transition: all 0.5s ease;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ContentContainer = styled.div`
  /* padding: 20px 0 0 30px; */
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
  position: relative;
  h4 {
    height: 40px;
    font-size: 16.5px;
    font-weight: 650;
    color: #434a5e;
  }

  h6 {
    font-size: 18px;
    font-weight: 450;
    color: #434a5e;
    span {
      font-size: 9px;
      font-weight: 700;
    }
  }
`;

const Wrap = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TextContainer = styled.div`
  text-align: center;
`;

const Rating = styled.div`
  margin-top: 10px;
  box-icon {
    height: 12px;
    width: 12px;
  }
`;

const BigButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 15px 0 20px;
  height: 40px;
  width: 215px;
  position: absolute;
  bottom: -11px;
`;

const AddToCartContainer = styled.div`
  display: flex;
  width: 75%;
  height: 100%;
  padding: 0 8px 0 2px;
  align-items: center;
  justify-content: space-evenly;
  background-color: #504e49;
  /* background-color: #333438ce; */
  /* background-color: #6b63ffcc; */
  background: linear-gradient(120deg, #b2aeff8e, #9892ffbd, #6b63ffc7 50%);
  border-radius: 8px;
  color: white;
  color: #504e49;
  border: none;
  outline: none;
  cursor: pointer;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
  transition: all 0.1s ease;
  box-icon {
    height: 18px;
    width: 18px;
  }
  span {
    font-size: 14px;
    font-weight: 500;
  }
  :hover {
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.2);
    transform: scale(1.03);
  }
`;

const SavedContainer = styled.div`
  height: 100%;
  width: 20%;
  margin-left: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.733);
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
  transition: all 0.1s ease;
  box-icon {
    height: 17px;
    width: 17px;
  }

  :hover {
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.2);
    transform: scale(1.05) rotateZ(10deg);
  }
`;
