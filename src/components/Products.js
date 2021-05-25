import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import productNotFound from "../svg/productNotFound.svg";

function Products({ products }) {
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
      {products.length !== 0 ? (
        <ProductContainer>
          {products?.map((product, index) => (
            <Link
              style={{ textDecoration: "none" }}
              to={`/products/all/${product.id}`}
            >
              <ProductCard
                key={index}
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
      ) : (
        <ProductNotFoundContainer>
          <img src={productNotFound} alt="" />
          <h3>Product Not Found</h3>
        </ProductNotFoundContainer>
      )}
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

const ProductNotFoundContainer = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: 200px;
    margin-bottom: 30px;
  }
  h3 {
    font-size: 20px;
    font-weight: 700;
    color: #434a5e;
  }
`;
