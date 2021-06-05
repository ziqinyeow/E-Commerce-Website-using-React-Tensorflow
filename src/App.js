import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
// import * as mobilenet from "@tensorflow-models/mobilenet";
import styled from "styled-components";
import allProducts from "./data/all";
import { shuffle } from "./functions/ArrayFunction";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Home from "./components/Home";
import Products from "./components/Products";
import Explore from "./components/Explore";
import Saved from "./components/Saved";
import Cart from "./components/Cart";
import ProductScreen from "./components/ProductScreen";
import ScrollToTop from "./components/ScrollToTop";
import UnderConstruction from "./components/UnderConstruction";
import Signup from "./components/Signup";
import Aftersales from "./components/Aftersales";
import Analytics from "./components/Analytics";

function App() {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const handleSearch = (input) => {
    input = input.toLowerCase().trim();
    setSearch(input);
    const arr = input.split(" ");

    var all = [];

    var exact = allProducts?.filter((found) => {
      var temp =
        found.fullName + " " + found.id + " " + found.brand + " " + found.color;
      temp = temp.toLowerCase();
      return (
        arr.every((item) => temp.includes(item)) ||
        found.url.toLowerCase().includes(input.replace("http", ""))
      );
    });

    all.push(...exact);

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].length < 2 || arr[i] === "I" || arr[i] === "to") {
        // all = [];
        continue;
      }

      var similar = allProducts?.filter((found) => {
        return (
          found.fullName.toLowerCase().includes(arr[i]) ||
          found.color.toLowerCase().includes(arr[i]) ||
          found.id.toLowerCase().includes(arr[i]) ||
          found.brand.toLowerCase().includes(arr[i]) ||
          found.url.toLowerCase().includes(input.replace("http", ""))
        );
      });
      all.push(...similar);
    }

    all = [...new Set(all)];
    // shuffle(all);
    setResult([...all]);
  };

  return (
    <Router>
      <Container>
        <Sidebar />
        <SidebarOverlay></SidebarOverlay>
        <Switch>
          <Main>
            <Header search={handleSearch} />
            <HeaderOverlay></HeaderOverlay>

            <Route path="/products/all" exact>
              <Products
                products={search?.length === 0 ? allProducts : result}
                input={search}
              />
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
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/aftersales">
              <Aftersales />
            </Route>
            <Route path="/analytics">
              <Analytics />
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
