import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import bag from "../data/bag";
import television from "../data/television";
import clothing from "../data/clothing";
import sport from "../data/sport";

function Products() {
  const products = [...bag, ...television, ...clothing, ...sport];
  // const shuffle = (array) => {
  //   var currentIndex = array.length,
  //     temporaryValue,
  //     randomIndex;
  //   while (0 !== currentIndex) {
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex -= 1;
  //     temporaryValue = array[currentIndex];
  //     array[currentIndex] = array[randomIndex];
  //     array[randomIndex] = temporaryValue;
  //   }
  //   return array;
  // };
  // shuffle(products);
  return (
    <Container>
      <Header>
        <h1>Products</h1>
      </Header>
      <ProductContainer>
        {products?.map((product) => (
          <Link
            style={{ textDecoration: "none" }}
            to={`/products/${product.id}`}
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
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    width: 82%;
    font-size: 28px;
    font-weight: 700;
    color: #504e49;
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
