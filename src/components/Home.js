import React from "react";
import styled from "styled-components";
import PromotionSection from "./PromotionSection";
import CategoriesSection from "./CategoriesSection";
import WelcomeSection from "./WelcomeSection";
import HomeSlider from "./HomeSlider";
import UnderConstruction from "./UnderConstruction";

function Home() {
  return (
    <Container>
      <WelcomeSection />
      <HomeSlider />
      <CategoriesSection />
      <PromotionSection />
      <UnderConstruction />
    </Container>
  );
}

export default Home;

const Container = styled.div`
  ${"" /* width: calc(100vw - 78px); */}
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 50;
`;
