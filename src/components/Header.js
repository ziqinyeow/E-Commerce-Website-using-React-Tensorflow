import React from "react";
import styled from "styled-components";
import "boxicons";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <BigContainer>
      <Container>
        <Searchbar>
          <form action="" method="post">
            <box-icon
              name="search-alt"
              color="#5469d4"
              animation="tada-hover"
            ></box-icon>
            <input type="text" placeholder="Search" />
            <box-icon
              name="camera-plus"
              type="solid"
              color="#5469d4"
              animation="tada-hover"
            ></box-icon>
          </form>
        </Searchbar>
        <IconsContainer>
          <box-icon
            name="bell"
            color="#434a5e"
            animation="tada-hover"
          ></box-icon>
          <box-icon
            name="user"
            color="#434a5e"
            animation="tada-hover"
          ></box-icon>
          <box-icon
            name="cog"
            color="#434a5e"
            animation="spin-hover"
          ></box-icon>
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <CartContainer>
              <box-icon
                name="cart"
                color="#434a5e"
                animation="tada-hover"
              ></box-icon>
              <span className="cart-no">{basket?.length}</span>
            </CartContainer>
          </Link>
        </IconsContainer>
      </Container>
    </BigContainer>
  );
}

export default Header;

const BigContainer = styled.div`
  width: 100%;
  background-color: white;
  position: fixed;
  top: 0;
  z-index: 98;
  border-bottom: 1px solid #e3e8ee;
  background-color: white;
  background-image: url("https://www.transparenttextures.com/patterns/gplay.png");
`;

const Container = styled.div`
  width: 90%;
  height: 50px;
  padding-right: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Searchbar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0.7;

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 75%;
    height: 100%;
  }

  input {
    width: 90%;
    height: 100%;
    outline: none;
    border: none;
    padding-left: 10px;
    font-size: 14px;
    font-weight: 600;
    color: #434a5e;
  }

  box-icon {
    height: 20px;
    width: 20px;
    text-align: center;
    margin-top: 3px;
    cursor: pointer;
  }
`;

const IconsContainer = styled.div`
  flex: 0.3;

  display: flex;
  align-items: center;
  justify-content: center;

  box-icon {
    height: 20px;
    width: 20px;
    text-align: center;
    margin: 0 10px;
    cursor: pointer;
  }
`;

const CartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 50px;
  cursor: pointer;

  .cart-no {
    text-decoration: none;
    color: #434a5e;
  }
`;
