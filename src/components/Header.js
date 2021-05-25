import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "boxicons";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";

function Header({ search, upload }) {
  const [{ basket, user }, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [imageInput, setImageInput] = useState(false);
  const [identifyBtn, setIdentifyBtn] = useState(false);
  const [results, setResults] = useState([]);
  const imageRef = useRef();

  const handleChange = (event) => {
    event.preventDefault();
    setInput(event.target.value);

    if (input.length >= 0) {
      history.push("/products/all");
    }
    if (
      event.target.value.substring(0, 8) === "https://" ||
      event.target.value.substring(0, 7) === "http://" ||
      event.target.value.substring(0, 10) === "data:image"
    ) {
      setImageURL(event.target.value);
      setImageInput(true);
    } else {
      setImageInput(false);
      setIdentifyBtn(false);
      setResults([]);
      search(event.target.value);
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await mobilenet.load();
      setModel(model);
      setIsModelLoading(false);
    } catch (error) {
      console.log(error);
      setIsModelLoading(false);
    }
  };

  const uploadImage = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);
    } else {
      setImageURL(null);
    }
  };

  const identify = async () => {
    setIdentifyBtn(true);
    const results = await model.classify(imageRef.current);
    setResults(results);
  };

  // useEffect(() => {
  //   try {
  //     identify();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [imageURL]);

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
              placeholder="Search"
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
                  Upload product related image for search
                </span>
                {imageURL && (
                  <img
                    src={imageURL}
                    alt="Upload Preview"
                    ref={imageRef}
                    crossOrigin="anonymous"
                    style={{ display: "none" }}
                  />
                )}
              </UploadImgDescription>
            </label>
            {imageInput && (
              <ImageButtonContainer
                style={{
                  width: identifyBtn ? "100%" : "50%",
                  left: identifyBtn ? "0" : "20%",
                }}
              >
                <button
                  style={{ display: identifyBtn ? "none" : "" }}
                  onClick={identify}
                >
                  <box-icon
                    type="solid"
                    name="search"
                    color="white"
                    animation="tada-hover"
                  ></box-icon>
                  Identify Image
                </button>
                {results.length > 0 && (
                  <Results>
                    {results.map((res) => {
                      return (
                        <Result
                          onClick={() => {
                            search(res.className) && setInput(res.className);
                          }}
                        >
                          {res.className}{" "}
                          <span>
                            {(
                              Math.round(res.probability * 100 * 100) / 100
                            ).toFixed(2)}
                            %
                          </span>
                        </Result>
                      );
                    })}
                  </Results>
                )}
                {identifyBtn && results.length == 0 && <span>No results</span>}
              </ImageButtonContainer>
            )}
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
    padding: 0 10px;
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
  position: relative;

  label {
    position: relative;
  }
`;

const ImageButtonContainer = styled.div`
  padding: 20px 0;
  top: 110%;
  border-radius: 8px;
  position: absolute;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  background-image: url("https://www.transparenttextures.com/patterns/gplay.png");
  transition: all 1s ease;

  button {
    outline: none;
    border: none;
    border-radius: 8px;
    padding: 5px;
    width: 150px;
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: white;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    background-color: #6c63ff;
    transition: all 0.3s ease;

    :hover {
      background-color: #514bc0;
    }
  }

  ::after {
    content: "";
    position: absolute;
    bottom: 98%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #6c63ff transparent transparent transparent;
  }
`;

const Results = styled.div`
  width: 80%;
`;

const Result = styled.div`
  padding: 5px 10px;
  margin: 5px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease;

  :hover {
    background-color: #dad9d6;
  }

  span {
    font-size: 14px;
    font-weight: 500;
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
    border-radius: 8px;
    padding: 20px;
    position: absolute;
    z-index: 10;
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
