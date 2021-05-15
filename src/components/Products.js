import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import bag from "../data/bag";
import television from "../data/television";
import clothing from "../data/clothing";
import sport from "../data/sport";

function Products() {
  const shuffle = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };
  const products = [...bag, ...television, ...clothing, ...sport];
  shuffle(bag);
  shuffle(television);
  shuffle(clothing);
  shuffle(sport);
  return (
    <Container>
      <Header>
        <HeaderContainer>
          <box-icon
            type="solid"
            name="shopping-bag-alt"
            color="#504e49"
            animation="tada"
          ></box-icon>
          <h1>Products</h1>
        </HeaderContainer>
      </Header>
      <ProductContainer>
        {products?.map((product) => (
          <Link
            style={{ textDecoration: "none" }}
            to={`/products/all/${product.id}`}
          >
            <ProductCard
              id={product.id}
              name={product.name}
              fullName={product.fullName}
              description={product.description}
              image={product.url}
              price={product.price}
              producedBy={product.producedBy}
              year={product.year}
              rating={product.rating}
              bcolor={product.bcolor}
              color={product.color}
            />
          </Link>
        ))}
      </ProductContainer>
    </Container>
  );
}

export default Products;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  height: 20vh;
  margin-bottom: 50px;
  background: url("https://www.transparenttextures.com/patterns/inspiration-geometry.png"),
    linear-gradient(
      90deg,
      rgba(236, 248, 255, 1) 0%,
      rgba(120, 159, 255, 0.8018557764902836) 100%
    );
  display: flex;
  align-items: center;
  justify-content: center;
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

const ProductContainer = styled.div`
  padding: 5px 30px 30px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 30px;
  min-height: 100vh;
  overflow: hidden;

  @media screen and (max-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 1208px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 936px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 638px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
