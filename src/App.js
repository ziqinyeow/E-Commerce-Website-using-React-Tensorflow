import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import * as mobilenet from "@tensorflow-models/mobilenet";
import styled from "styled-components";
import allProducts from "./data/all";
import { shuffle, similarity, editDistance } from "./functions/ArrayFunction";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Home from "./components/Home";
import Products from "./components/Products";
import Explore from "./components/Explore";
import Saved from "./components/Saved";
import Cart from "./components/Cart";
import ProductScreen from "./components/ProductScreen";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [imageURL, setImageURL] = useState(null);

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

  useEffect(() => {
    loadModel();
  }, []);

  if (isModelLoading) {
  }

  const handleSearch = (input) => {
    input = input.toLowerCase();
    if (
      input.substring(0, 8) === "https://" ||
      input.substring(0, 7) === "http://"
    ) {
    }
    setSearch(input);
    const exact = allProducts?.filter((found) => {
      return (
        found.fullName.toLowerCase().includes(input) ||
        found.color.toLowerCase().includes(input)
      );
    });
    setResult([...exact]);
  };

  const uploadImg = (image) => {
    setImageURL(image);
  };

  return (
    <Router>
      <Container>
        <Sidebar />
        <SidebarOverlay></SidebarOverlay>
        <Switch>
          <Main>
            <Header search={handleSearch} upload={uploadImg} />
            <HeaderOverlay></HeaderOverlay>
            <Route path="/products/all" exact>
              <Products
                products={search?.length === 0 ? allProducts : result}
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
