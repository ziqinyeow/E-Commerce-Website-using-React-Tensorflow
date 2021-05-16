import React from "react";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";
import { getBasketTotal } from "../reducer";
import { Link } from "react-router-dom";
import SavedItem from "./SavedItem";
import emptySaved from "../svg/emptysaved.svg";
import cravingForMore from "../svg/cravingformore.svg";

function Cart() {
  const [{ basket, saved, user }, dispatch] = useStateValue();
  return (
    <Container>
      <Header>
        <HeaderContainer>
          <box-icon
            name="home-heart"
            color="#504e49"
            animation="tada"
          ></box-icon>
          <h1>Saved</h1>
        </HeaderContainer>
        <SubtotalContainer>
          <SubtotalInnerContainer>
            <h5>Total Saved:</h5>
            <h6>
              {saved.length} <span>{saved.length <= 1 ? "item" : "items"}</span>
            </h6>
          </SubtotalInnerContainer>
          <Line></Line>
        </SubtotalContainer>
      </Header>
      {saved.length === 0 ? (
        <EmptySavedContainer>
          <img src={emptySaved} alt="Empty Cart" />
          <h1>No saved item yet</h1>
          <Link to="/products/all" style={{ textDecoration: "none" }}>
            <ShopButtonContainer>
              <box-icon type="solid" name="category" color="white"></box-icon>
              <span>Check for more</span>
            </ShopButtonContainer>
          </Link>
        </EmptySavedContainer>
      ) : (
        <SavedContainer>
          <SavedItemContainer>
            {saved.map((item) => (
              <SavedItem
                key={item.key}
                id={item.id}
                name={item.name}
                fullName={item.fullName}
                image={item.image}
                price={item.price}
                producedBy={item.producedBy}
                year={item.year}
                rating={item.rating}
                bcolor={item.bcolor}
                color={item.color}
                quantity={item.quantity}
              />
            ))}
          </SavedItemContainer>
          <CravingForMoreContainer>
            <img src={cravingForMore} alt="" />
            <Link to="/products/all" style={{ textDecoration: "none" }}>
              <ShopButtonContainer>
                <box-icon type="solid" name="grid-alt" color="white"></box-icon>
                <span>Craving for more?</span>
              </ShopButtonContainer>
            </Link>
          </CravingForMoreContainer>
        </SavedContainer>
      )}
    </Container>
  );
}

export default Cart;

const Container = styled.div``;

const Header = styled.div`
  height: 20vh;
  margin-bottom: 100px;
  background: url("https://www.transparenttextures.com/patterns/inspiration-geometry.png"),
    linear-gradient(
      90deg,
      rgba(236, 248, 255, 1) 0%,
      rgba(120, 159, 255, 0.8018557764902836) 100%
    );
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const HeaderContainer = styled.div`
  width: 82%;
  display: flex;
  align-items: center;
  h1 {
    font-size: 30px;
    font-weight: 700;
    color: #504e49;
  }
  box-icon {
    width: 30px;
    height: 30px;
    margin: 2px 20px 0 10px;
  }
`;

const SubtotalContainer = styled.div`
  position: absolute;
  top: 15%;
  right: 6%;
  height: 200px;
  width: 300px;
  margin: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
`;

const SubtotalInnerContainer = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  h5 {
    font-size: 25px;
    font-weight: 700;
    color: #504e49;
  }
  h6 {
    text-align: right;
    font-size: 20px;
    font-weight: 600;
    color: #504e49;
    span {
      font-size: 10px;
    }
  }
`;

const EmptySavedContainer = styled.div`
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  img {
    width: 200px;
    height: 200px;
  }
  h1 {
    font-size: 20px;
    font-weight: 600;
    color: #504e49;
  }
`;

const ShopButtonContainer = styled.div`
  width: 200px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #6c63ff;
  border-radius: 8px;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
  transition: all 0.5s ease;
  cursor: pointer;
  box-icon {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  span {
    color: white;
    font-size: 15px;
    font-weight: 500;
  }
  :hover {
    background-color: #514bc0;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;

const Line = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 5px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background: linear-gradient(
    180deg,
    rgba(236, 248, 255, 1) 0%,
    rgba(120, 159, 255, 0.8018557764902836) 100%
  );
`;

const SavedContainer = styled.div``;

const SavedItemContainer = styled.div`
  margin: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 50vh;
`;

const CravingForMoreContainer = styled.div`
  padding: 70px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    width: 300px;
    height: 300px;
    margin-bottom: 20px;
  }
`;
