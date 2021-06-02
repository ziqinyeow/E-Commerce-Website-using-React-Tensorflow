import React from "react";
import styled from "styled-components";
import gift from "../svg/gift.svg";
import tour from "../svg/Tour.svg";
import promotion from "../svg/promotion.svg";
import suggestion from "../svg/suggestion.svg";
import UnderConstruction from "./UnderConstruction";

function Explore() {
  return (
    <Container>
      <TopContainer>
        <Grid>
          <h3>Trend</h3>
          <img src={tour} alt="" />
        </Grid>
        <Grid>
          <h3>Gift</h3>
          <img src={gift} alt="" />
        </Grid>
        <Grid>
          <h3>Promotion</h3>
          <img src={promotion} alt="" />
        </Grid>
        <Grid>
          <h3>Suggestion</h3>
          <img src={suggestion} alt="" />
        </Grid>
      </TopContainer>
      <UnderConstruction />
    </Container>
  );
}

export default Explore;

const Container = styled.div``;

const TopContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media screen and (max-width: 1253px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 976px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 622px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Grid = styled.div`
  margin: 10px;
  padding: 30px;
  border-radius: 8px;
  /* width: 25%; */
  height: 20vh;
  box-shadow: 5px 5px 15px -5px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  position: relative;

  h3 {
    font-size: 23px;
    font-weight: 600;
    color: #6c63ff;
    position: relative;
    z-index: 1;
  }

  img {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 140px;
    object-fit: contain;
    z-index: 0;
  }

  :hover {
    background-color: #f0f0f0;

    h3 {
    }
  }
`;
