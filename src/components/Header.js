import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import "boxicons";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";

function Header({ search, upload }) {
  const [{ basket, user }, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const handleChange = (event) => {
    event.preventDefault();
    setInput(event.target.value);
    search(event.target.value);
    if (input.length !== 0) {
      history.push("/products/all");
    }
  };

  const uploadImage = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      upload(url);
    } else {
      upload(null);
    }
  };

  return (
    <BigContainer>
      <Container>
        <Searchbar>
          <Form>
            <box-icon
              name="search-alt"
              color="#5469d4"
              animation="tada-hover"
            ></box-icon>
            <input
              type="text"
              placeholder="Search Products"
              onChange={handleChange}
              value={input}
            />
            <input
              type="file"
              accept="image/*"
              capture="camera"
              id="file"
              onChange={uploadImage}
              hidden
            />
            <label
              for="file"
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setVisible(true)}
              onMouseLeave={() => setVisible(false)}
            >
              <box-icon
                name="camera-plus"
                type="solid"
                color="#5469d4"
                animation="tada-hover"
              ></box-icon>
              <UploadImgDescription>
                <span className={visible ? "show" : ""}>
                  Tips: Upload product related image for search
                </span>
              </UploadImgDescription>
            </label>
          </Form>
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

const Form = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75%;
  height: 100%;

  label {
    position: relative;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const UploadImgDescription = styled.div`
  span {
    font-size: 15px;
    font-weight: 500;
    background-color: white;
    background-image: url("https://www.transparenttextures.com/patterns/gplay.png");
    color: #434a5e;
    visibility: hidden;
    width: 160px;
    text-align: left;
    border-radius: 6px;
    padding: 20px;
    position: absolute;
    z-index: 1;
    top: 125%;
    left: 50%;
    margin-left: -80px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: all 0.5s ease;

    ::after {
      content: "";
      position: absolute;
      bottom: 92%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: #6c63ff transparent transparent transparent;
    }
  }
  .show {
    visibility: visible;
    opacity: 1;
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

  @media screen and (max-width: 866px) {
    span {
      margin-right: 20px;
    }
  }

  @media screen and (max-width: 600px) {
    span {
      margin-right: 30px;
    }
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
