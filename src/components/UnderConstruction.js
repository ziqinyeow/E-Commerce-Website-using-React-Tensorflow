import React from "react";
import styled from "styled-components";
import construction from "../svg/construction.svg";

function UnderConstruction() {
  return (
    <Container>
      <img src={construction} alt="" />
      <h1>This page is still under constructions</h1>
    </Container>
  );
}

export default UnderConstruction;

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    margin-bottom: 50px;
    width: 50vw;
  }
  h1 {
    font-size: 20px;
    font-weight: 500;
  }
`;
