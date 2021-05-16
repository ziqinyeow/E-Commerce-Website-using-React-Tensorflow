import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import "boxicons";
import notFound from "../svg/notfound.svg";
import review from "../svg/review.svg";
import bag from "../data/bag";
import television from "../data/television";
import clothing from "../data/clothing";
import sport from "../data/sport";
import store from "../data/store";

function ProductScreen() {
  const params = useParams();
  const products = [...bag, ...television, ...clothing, ...sport];
  const product = products.find((x) => x.id === params.id);
  const [quantity, setQuantity] = useState(1);
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  if (!product) {
    return (
      <ProductNotFoundContainer>
        <img src={notFound} alt="" />
        <h1>Product Not Found</h1>
      </ProductNotFoundContainer>
    );
  }

  const AddToCart = (e) => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: product.id,
        name: product.name,
        fullName: product.fullName,
        description: product.description,
        image: product.url,
        price: product.price,
        producedBy: product.producedBy,
        year: product.year,
        rating: product.rating,
        bcolor: product.bcolor,
        color: product.color,
        quantity: quantity,
      },
    });
    e.preventDefault();
  };

  const Saved = (e) => {
    dispatch({
      type: "ADD_TO_SAVED",
      item: {
        id: product.id,
        name: product.name,
        fullName: product.fullName,
        description: product.description,
        image: product.url,
        price: product.price,
        producedBy: product.producedBy,
        year: product.year,
        rating: product.rating,
        bcolor: product.bcolor,
        color: product.color,
        quantity: product.quantity,
      },
    });
    e.preventDefault();
  };

  var targetStore = store.find((x) => x.name === product?.brand);

  const IncQuantity = () => {
    setQuantity(quantity + 1);
  };

  const DecQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Container>
      <TopContainer>
        <PreviousContainer onClick={history.goBack}>
          <box-icon
            name="left-arrow-alt"
            color="#504e49"
            animation="tada-hover"
          ></box-icon>
        </PreviousContainer>
        <DotContainer>
          <box-icon
            name="dots-horizontal-rounded"
            color="#504e49"
            animation="tada-hover"
          ></box-icon>
        </DotContainer>
        <ShareContainer>
          <box-icon
            name="share-alt"
            type="solid"
            color="#504e49"
            animation="tada-hover"
          ></box-icon>
        </ShareContainer>
        <QRContainer>
          <box-icon
            name="barcode-reader"
            color="#504e49"
            animation="tada-hover"
          ></box-icon>
        </QRContainer>
        <ImgContainer bcolor={product.bcolor}>
          <img src={product.url} alt="" />
        </ImgContainer>
        <DescriptionContainer>
          <Wrap>
            <Brand>
              <h1>{product.brand}</h1>
            </Brand>
            <ProductName>
              <h3>{product.fullName}</h3>
            </ProductName>
            <Year>
              <h4>{product.year}</h4>
            </Year>
            <Rating>
              {Array(product.rating)
                .fill()
                .map((_, i) => (
                  <box-icon type="solid" name="star" color="#6c63ff"></box-icon>
                ))}
              {Array(5 - product.rating)
                .fill()
                .map((_, i) => (
                  <box-icon name="star" color="#6c63ff"></box-icon>
                ))}
            </Rating>
            <FeaturesContainer>
              <Feature>
                <box-icon
                  color="#504e49"
                  type="solid"
                  name="message-alt-check"
                  animation="tada-hover"
                ></box-icon>
                <span>Iconiz Verified</span>
              </Feature>
              <Feature>
                <box-icon
                  color="#504e49"
                  name="money"
                  animation="tada-hover"
                ></box-icon>
                <span>Money-Back Guaranteed</span>
              </Feature>
              <Feature>
                <box-icon
                  color="#504e49"
                  name="trending-down"
                  animation="tada-hover"
                ></box-icon>
                <span>Lowest-Price Guaranteed</span>
              </Feature>
              <Feature>
                <box-icon
                  color="#504e49"
                  name="car"
                  animation="tada-hover"
                ></box-icon>
                <span>
                  Free Delivery with min. purchase {(product.price * 110) / 100}{" "}
                  at the store
                </span>
              </Feature>
              <Gap></Gap>
              {product.description.map((des) => (
                <Feature>
                  <box-icon
                    color="#6c63ff"
                    type="solid"
                    name="chevron-right"
                    animation="tada-hover"
                  ></box-icon>
                  <span>{des}</span>
                </Feature>
              ))}
            </FeaturesContainer>
            <Price>
              <span>RM </span>
              {(Math.round(product.price * quantity * 100) / 100).toFixed(2)}
            </Price>
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
            <ButtonsContainer>
              <AddToCartButton onClick={AddToCart}>
                <box-icon
                  color="white"
                  name="cart-add"
                  type="solid"
                  animation="tada-hover"
                ></box-icon>
                <span>Add To Cart</span>
              </AddToCartButton>
              <SavedButton onClick={Saved}>
                <box-icon
                  color="#6c63ff"
                  name="heart"
                  animation="tada-hover"
                ></box-icon>
              </SavedButton>
            </ButtonsContainer>
          </Wrap>
        </DescriptionContainer>
      </TopContainer>
      <StoreInformationContainer>
        <StoreInformation>
          <img src={targetStore.url} alt="" />
          <StoreMainContainer>
            <h1>{targetStore.name}</h1>
            <h3>{product.producedBy}</h3>
            <h4>
              Active {targetStore.active}{" "}
              {targetStore.active === 1 ? "hour" : "hours"} ago
            </h4>
            <StoreButtonsContainer>
              <StoreButtonContainer>
                <box-icon
                  name="message-square-detail"
                  type="solid"
                  color="white"
                  animation="tada-hover"
                ></box-icon>
                <span>Chat Now</span>
              </StoreButtonContainer>
              <StoreButtonContainer>
                <box-icon
                  type="solid"
                  name="shopping-bags"
                  color="white"
                  animation="tada-hover"
                ></box-icon>
                <span>View Shop</span>
              </StoreButtonContainer>
            </StoreButtonsContainer>
          </StoreMainContainer>
        </StoreInformation>
      </StoreInformationContainer>
      <ReviewContainer>
        <ReviewInnerContainer>
          <img src={review} alt="" />
          <h1>No review yet</h1>
        </ReviewInnerContainer>
      </ReviewContainer>
    </Container>
  );
}

export default ProductScreen;

const ProductNotFoundContainer = styled.div`
  height: calc(100vh - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: url();
  img {
    width: 250px;
    margin-bottom: 50px;
  }

  h1 {
    font-size: 20px;
    font-weight: 700;
    color: #504e49;
  }
`;

const Container = styled.div``;

const TopContainer = styled.div`
  height: calc(120vh - 50px);
  display: flex;
  align-items: center;
  overflow: scroll;
  position: relative;
`;

const PreviousContainer = styled.div`
  position: absolute;
  top: 25px;
  left: 25px;
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
    width: 22px;
    height: 22px;
  }
  :hover {
    background-color: #e4e4e4;
  }
`;

const DotContainer = styled.div`
  position: absolute;
  top: 25px;
  right: 50px;
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
    width: 22px;
    height: 22px;
  }
  :hover {
    background-color: #e4e4e4;
  }
`;

const ShareContainer = styled.div`
  position: absolute;
  top: 25px;
  right: 110px;
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

const QRContainer = styled.div`
  position: absolute;
  top: 25px;
  right: 150px;
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
    width: 20px;
    height: 20px;
  }
  :hover {
    background-color: #e4e4e4;
  }
`;

const ImgContainer = styled.div`
  width: 40vw;
  height: 100%;
  background-color: ${(props) => props.bcolor};
  border-right: 1px solid #e3e8ee;
  img {
    height: calc(100vh - 50px);
    width: 100%;
    object-fit: scale-down;
  }
`;

const DescriptionContainer = styled.div`
  width: calc(60vw - 78px);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const Wrap = styled.div`
  width: 30vw;

  @media screen and (max-width: 1078px) {
    width: 35vw;
  }
  @media screen and (max-width: 992px) {
    width: 40vw;
  }
`;

const Brand = styled.div`
  margin-bottom: 5px;
  h1 {
    font-size: 40px;
    font-weight: 700;
    color: #504e49;
  }
`;

const ProductName = styled.div`
  margin-bottom: 5px;
  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #504e49;
  }
`;

const Year = styled.div`
  margin-bottom: 7px;
  h4 {
    font-size: 15px;
    font-weight: 300;
    color: #504e49;
  }
`;

const Rating = styled.div`
  box-icon {
    width: 17px;
    height: 17px;
  }
`;

const FeaturesContainer = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  color: #504e49;
  font-size: 16px;
  font-weight: 500;
`;

const Feature = styled.div`
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  box-icon {
    width: 22px;
    height: 22px;
  }
  span {
    margin-left: 10px;
    padding-bottom: 3px;
  }
`;

const Gap = styled.div`
  height: 25px;
`;

const Price = styled.div`
  margin-top: 20px;
  color: #504e49;
  font-size: 25px;
  font-weight: 500;
  span {
    font-size: 12px;
    margin-right: 5px;
  }
`;

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

const ButtonsContainer = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
`;

const AddToCartButton = styled.div`
  position: relative;
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #6c63ff;
  color: white;
  cursor: pointer;
  border-radius: 8px;
  box-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  span {
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 3px;
  }
  :hover {
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }
`;

const SavedButton = styled.div`
  margin-left: 20px;
  height: 50px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.1s ease;
  :hover {
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.2);
    transform: scale(1.05) rotateZ(2deg);
  }
`;

const StoreInformationContainer = styled.div`
  margin: 30px 0;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StoreInformation = styled.div`
  width: 87%;
  height: 90%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  img {
    /* height: 100%; */
    width: 30%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 8px;
  }
`;

const StoreMainContainer = styled.div`
  width: 70%;
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 30px;
    font-weight: 700;
    color: #504e49;
  }
  h3 {
    font-size: 15px;
    font-weight: 600;
    color: #504e49;
  }
  h4 {
    font-size: 15px;
    font-weight: 300;
    color: #504e49;
  }
`;

const StoreButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const StoreButtonContainer = styled.div`
  margin-right: 20px;
  width: 140px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #6c63ff;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  :hover {
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }
  box-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  span {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 3px;
  }
`;

const ReviewContainer = styled.div`
  margin: 30px 0;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ReviewInnerContainer = styled.div`
  width: 87%;
  height: 90%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    margin-bottom: 50px;
    width: 200px;
  }
  h1 {
    font-size: 23px;
    font-weight: 700;
    color: #504e49;
  }
`;
