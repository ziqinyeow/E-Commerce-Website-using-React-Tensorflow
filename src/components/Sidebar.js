import React from "react";
import styled from "styled-components";
import "boxicons";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";

function Sidebar() {
  const [{ saved }] = useStateValue();
  return (
    <BigContainer>
      <Container>
        <Link to="/">
          <LogoContainer>
            <box-icon
              type="logo"
              name="redux"
              color="#6c63ff"
              animation="tada-hover"
            ></box-icon>
          </LogoContainer>
        </Link>
        <IconsContainer>
          <Link to="/">
            <IconContainer>
              <box-icon
                name="home"
                color="#434a5e"
                animation="tada-hover"
              ></box-icon>
              <Tooltip>Home</Tooltip>
            </IconContainer>
          </Link>
          <Link to="/explore">
            <IconContainer>
              <box-icon
                name="compass"
                color="#434a5e"
                animation="tada-hover"
              ></box-icon>
              <Tooltip>Explore</Tooltip>
            </IconContainer>
          </Link>
          <Link to="/products/all">
            <IconContainer>
              <box-icon
                name="category-alt"
                color="#434a5e"
                animation="tada-hover"
              ></box-icon>
              <Tooltip>Products</Tooltip>
            </IconContainer>
          </Link>
          <Link to="/saved" style={{ textDecoration: "none" }}>
            <IconContainer>
              <box-icon
                name="heart"
                color="#434a5e"
                animation="tada-hover"
              ></box-icon>
              <SavedCounts>
                <span>{saved.length}</span>
              </SavedCounts>
              <Tooltip>Saved</Tooltip>
            </IconContainer>
          </Link>
          <Link to="/aftersales" style={{ textDecoration: "none" }}>
            <IconContainer>
              <box-icon
                name="user-voice"
                color="#434a5e"
                animation="tada-hover"
              ></box-icon>
              <Tooltip>After Sales</Tooltip>
            </IconContainer>
          </Link>
          <Link to="/analytics" style={{ textDecoration: "none" }}>
            <IconContainer>
              <box-icon
                name="pie-chart"
                color="#434a5e"
                animation="tada-hover"
              ></box-icon>
              <Tooltip>Analytics</Tooltip>
            </IconContainer>
          </Link>
        </IconsContainer>
        <BottomIconsContainer>
          <BottomIconContainer>
            <box-icon
              name="comment-error"
              color="#434a5e"
              animation="tada-hover"
            ></box-icon>
            <Tooltip>Feedback</Tooltip>
          </BottomIconContainer>
          <BottomIconContainer>
            <box-icon
              name="help-circle"
              color="#434a5e"
              animation="tada-hover"
            ></box-icon>
            <Tooltip>Help</Tooltip>
          </BottomIconContainer>
        </BottomIconsContainer>
      </Container>
    </BigContainer>
  );
}

export default Sidebar;

const BigContainer = styled.div`
  position: fixed;
  left: 0;
  z-index: 99;
`;

const Container = styled.div`
  width: 78px;
  height: 100vh;
  background-color: #f7fafc;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #e3e8ee;
  transition: all 0.5s ease;

  box-icon {
    height: 20px;
    width: 20px;
    text-align: center;
    color: #5469d4;
  }
`;

const LogoContainer = styled.div`
  height: 50px;
  width: 70%;
  margin: 5px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconsContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0.9;
`;

const Tooltip = styled.span`
  position: absolute;
  top: 50%;
  left: 122px;
  height: 35px;
  width: 122px;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  line-height: 35px;
  text-align: center;
  background-color: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  opacity: 0;
  text-decoration: none;
  color: black;
  pointer-events: none;
  display: none;
  transition: all 0.5s ease;
`;

const IconContainer = styled.div`
  height: 50px;
  width: 55px;
  margin: 5px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  position: relative;
  cursor: pointer;

  :hover {
    background-color: #d4e3fa;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }

  &:hover ${Tooltip} {
    opacity: 1;
    display: block;
  }
`;

const BottomIconsContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0.1;
  margin-bottom: 10px;
`;

const BottomIconContainer = styled.div`
  height: 50px;
  width: 70%;
  margin: 5px;
  padding: 5px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  position: relative;
  cursor: pointer;

  :hover {
    background-color: #d4e3fa;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }

  &:hover ${Tooltip} {
    opacity: 1;
    display: block;
  }
`;

const SavedCounts = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: #6c63ff;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 10px;
    color: white;
  }
`;
