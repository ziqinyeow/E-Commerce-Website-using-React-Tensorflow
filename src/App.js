import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Header from "./components/Header";
import Products from "./components/Products";
import Explore from "./components/Explore";
import Saved from "./components/Saved";
import Cart from "./components/Cart";
import ProductScreen from "./components/ProductScreen";
import ScrollToTop from "./components/ScrollToTop";

function App() {
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

  return (
    <Router>
      <Container>
        <Sidebar />
        <SidebarOverlay></SidebarOverlay>
        <Switch>
          <Main>
            <Header />
            <HeaderOverlay></HeaderOverlay>
            <Route path="/products/all" exact>
              <Products />
            </Route>
            <ScrollToTop>
              <Route path="/products/all/:id" exact>
                <ProductScreen />
              </Route>
            </ScrollToTop>
            <Route path="/explore">
              <Explore />
            </Route>
            <Route path="/saved" exact>
              <Saved />
            </Route>
            <Route path="/cart" exact>
              <Cart />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Main>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100%;
  display: grid;
  grid-template-columns: 78px auto;
  overflow-x: hidden;
`;

const Main = styled.div`
  display: grid;
  grid-template-rows: 50px auto;
`;

const SidebarOverlay = styled.div``;

const HeaderOverlay = styled.div``;
