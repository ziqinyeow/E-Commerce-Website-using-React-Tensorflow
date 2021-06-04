import React, { useEffect, useState } from "react";
import styled from "styled-components";
import stores from "../data/store";
import storeNameNotFound from "../svg/storenamenotfound.svg";
import contactMessage from "../svg/contactmessage.svg";
import UnderConstruction from "./UnderConstruction";

function Aftersales() {
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [currentStore, setCurrentStore] = useState({});
  const [lastMessage, setLastMessage] = useState("");

  const handleSearch = (event) => {
    const { value } = event.target;
    setInput(value);
    var exact = stores?.filter((found) => {
      return found.name.toLowerCase().includes(value.toLowerCase());
    });
    setSearchResult(exact);
  };

  const handleMessageInput = (event) => {
    const { value } = event.target;
    setMessageInput(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (messageInput !== "") {
      setLastMessage(messageInput);
      currentStore?.messages.push(messageInput);
      setMessageInput("");
    }
  };

  useEffect(() => {
    console.log(lastMessage);
  }, [lastMessage]);

  useEffect(() => {
    setMessageInput("");
  }, [currentStore]);

  return (
    <Container>
      <StoresContainer>
        <StoreDescriptionContainer>
          <User>
            <box-icon
              name="user-circle"
              color="#919191"
              animation="tada-hover"
            ></box-icon>
          </User>
          <ButtonsContainer>
            <ButtonContainer className="smallIcon">
              <box-icon
                type="solid"
                name="chat"
                color="#919191"
                animation="tada-hover"
              ></box-icon>
            </ButtonContainer>
            <ButtonContainer>
              <box-icon
                name="radio-circle-marked"
                color="#919191"
                animation="burst-hover"
              ></box-icon>
            </ButtonContainer>
            <ButtonContainer className="smallIcon">
              <box-icon
                name="dots-vertical-rounded"
                color="#919191"
                animation="tada-hover"
              ></box-icon>
            </ButtonContainer>
          </ButtonsContainer>
        </StoreDescriptionContainer>
        <NotificationContainer>
          <NotificationIconContainer>
            <box-icon type="solid" name="bell-ring" color="#6c63ff"></box-icon>
          </NotificationIconContainer>
          <NotificationTextContainer>
            <p>Get notified of new messages</p>
            <span>Turn on desktop notification &gt; </span>
          </NotificationTextContainer>
        </NotificationContainer>
        <SearchContainer>
          <SearchIcon>
            <box-icon
              name="search-alt"
              color="#5469d4"
              animation="tada-hover"
            ></box-icon>
          </SearchIcon>
          <input
            type="text"
            placeholder="Search store name"
            onChange={handleSearch}
            value={input}
          />
        </SearchContainer>
        <InnerStoreContainer>
          {input.length === 0
            ? stores.map((store, index) => (
                <StoreContainer
                  onClick={() => {
                    setCurrentStore(store);
                  }}
                >
                  <ImgContainer>
                    <img src={store.url} alt="" />
                  </ImgContainer>
                  <StoreInformation>
                    <StoreName>{store.name}</StoreName>
                    <LastActive>
                      Last active: {store.active}{" "}
                      {store.active > 1 ? "hours" : "hour"} ago
                    </LastActive>
                  </StoreInformation>
                </StoreContainer>
              ))
            : searchResult.map((store, index) => (
                <StoreContainer
                  onClick={() => {
                    setCurrentStore(store);
                  }}
                >
                  <ImgContainer>
                    <img src={store.url} alt="" />
                  </ImgContainer>
                  <StoreInformation>
                    <StoreName>{store.name}</StoreName>
                    <LastActive>
                      Last active: {store.active}{" "}
                      {store.active > 1 ? "hours" : "hour"} ago
                    </LastActive>
                  </StoreInformation>
                </StoreContainer>
              ))}
          {searchResult.length === 0 && input.length !== 0 && (
            <StoreNameNotFound>
              <img src={storeNameNotFound} alt="" />
              <p>Store name not found</p>
            </StoreNameNotFound>
          )}
        </InnerStoreContainer>
      </StoresContainer>
      {!currentStore.hasOwnProperty("name") ? (
        <EmptyContainer>
          <EmptyInnerContainer>
            <img src={contactMessage} alt="" />
            <EmptyContainerText>
              <h1>Welcome to the contact pages</h1>
              <h5>
                This is for project display purpose. Didn't link to any
                database, any changes will not be saved
              </h5>
            </EmptyContainerText>
          </EmptyInnerContainer>
        </EmptyContainer>
      ) : (
        <ChatContainer>
          <ChatTopContainer>
            <ChatTopInnerContainer>
              <ChatTopWrapImgText>
                <ChatTopImgContainer>
                  <img src={currentStore.url} alt="" />
                </ChatTopImgContainer>
                <ChatTopTextContainer>
                  <StoreName>{currentStore.name}</StoreName>
                  <LastActive>
                    Last Seen: {currentStore.active}{" "}
                    {currentStore.active > 1 ? "hours" : "hour"} ago{" "}
                    {currentStore.active > 1 ? "" : " "}
                  </LastActive>
                </ChatTopTextContainer>
              </ChatTopWrapImgText>
              <ChatTopIconsContainer>
                <ChatTopIconContainer>
                  <box-icon
                    name="search-alt-2"
                    type="solid"
                    color="#919191"
                    animation="tada-hover"
                  ></box-icon>
                </ChatTopIconContainer>
                <ChatTopIconContainer>
                  <box-icon
                    name="comment-dots"
                    type="solid"
                    color="#919191"
                    animation="tada-hover"
                  ></box-icon>
                </ChatTopIconContainer>
                <ChatTopIconContainer>
                  <box-icon
                    name="dots-vertical-rounded"
                    color="#919191"
                    animation="tada-hover"
                  ></box-icon>
                </ChatTopIconContainer>
              </ChatTopIconsContainer>
            </ChatTopInnerContainer>
          </ChatTopContainer>
          <ChatMiddleContainer>
            {currentStore.messages?.map((message, index) => (
              <ChatMiddleInnerContainer
                className={index % 2 === 0 ? "" : "userMessage"}
              >
                <ChatMessageContainer
                  className={index % 2 === 0 ? "storeMessage" : ""}
                >
                  {message}
                </ChatMessageContainer>
              </ChatMiddleInnerContainer>
            ))}
          </ChatMiddleContainer>
          <ChatBottomContainer>
            <ChatBottomInnerContainer onSubmit={handleSubmit}>
              <form>
                <input
                  type="text"
                  placeholder="Type"
                  onChange={handleMessageInput}
                  value={messageInput}
                ></input>
                <button
                  type="submit"
                  disabled={currentStore.messages.length % 2 === 0}
                >
                  <box-icon
                    name="send"
                    type="solid"
                    color="#6c63ff"
                    animation="tada-hover"
                  ></box-icon>
                </button>
              </form>
            </ChatBottomInnerContainer>
          </ChatBottomContainer>
        </ChatContainer>
      )}
    </Container>
  );
}

export default Aftersales;

const Container = styled.div`
  display: grid;
  grid-template-columns: 30% auto;
  height: calc(100vh - 50px);
  overflow: hidden;

  @media screen and (max-width: 1065px) {
    grid-template-columns: 40% auto;
  }
  @media screen and (max-width: 755px) {
    grid-template-columns: 45% auto;
  }
`;

const StoresContainer = styled.div`
  border-right: 1px solid #e3e8ee;
`;

const StoreDescriptionContainer = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  background-color: #f7fafc;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  box-icon {
    width: 30px;
    height: 30px;
  }
`;

const ButtonsContainer = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .smallIcon {
    box-icon {
      width: 19px;
      height: 19px;
    }
  }
`;

const ButtonContainer = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #f3f3f3;
  transition: all 0.2s ease;

  box-icon {
    width: 26px;
    height: 26px;
  }

  :hover {
    background-color: #e4e4e4;
  }
`;

const NotificationContainer = styled.div`
  padding: 5%;
  height: 100px;
  display: flex;
  align-items: center;
  background: linear-gradient(120deg, #b2aeff, #9892ff, #6c63ff 50%);
`;

const NotificationIconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  box-icon {
    width: 20px;
    height: 20px;
  }
`;

const NotificationTextContainer = styled.div`
  margin-left: 10%;
  color: white;
  p {
    font-weight: 500;
  }

  span {
    font-size: 14px;
    cursor: pointer;
  }
`;

const SearchContainer = styled.div`
  padding-left: 10px;
  height: 50px;
  width: 100%;
  background-color: #f7fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    margin-left: 19px;
    width: 90%;
    height: 100%;
    outline: none;
    border: none;
    padding: 0 10px;
    font-size: 14px;
    font-weight: 600;
    color: #434a5e;
    background: transparent;
  }
`;

const SearchIcon = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-icon {
    height: 20px;
    width: 20px;
    margin-top: 3px;
    cursor: pointer;
  }
`;

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyInnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  img {
    width: 250px;
    padding-bottom: 50px;
  }

  @media screen and (max-width: 870px) {
    transform: scale(0.9);
  }
  @media screen and (max-width: 815px) {
    transform: scale(0.6);
  }
  @media screen and (max-width: 755px) {
    transform: scale(0.4);
  }
`;

const EmptyContainerText = styled.div`
  text-align: center;
  h1 {
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 30px;
  }
  h5 {
    font-size: 17px;
    font-weight: 300;
    width: 50ch;
  }
`;

const InnerStoreContainer = styled.div`
  height: calc(60vh + 30px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  ::-webkit-scrollbar {
    width: 6px !important;
    height: 2px !important;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #6c63ff;
    border-radius: 2px;
  }
  ::-webkit-scrollbar-track {
    background-color: #c6ccdb;
  }
`;

const StoreContainer = styled.div`
  border-top: 1px solid #e3e8ee;
  border-bottom: 1px solid #e3e8ee;
  padding: 8px;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  :hover {
    background-color: #f3f3f3;
  }
`;

const ImgContainer = styled.div`
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const StoreInformation = styled.div`
  width: 70%;
  padding-left: 30px;
`;

const StoreName = styled.p`
  font-weight: 500;
`;

const LastActive = styled.p`
  font-size: 14.5px;
  font-weight: 300;
`;

const StoreNameNotFound = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  p {
    margin-top: 10px;
    color: #434a5e;
    font-size: 18px;
    font-weight: 500;
  }
  img {
    width: 200px;
    height: 200px;
  }
`;

const ChatContainer = styled.div`
  display: grid;
  grid-template-rows: 70px calc(100vh - 70px - 90px - 50px) 90px;
`;

const ChatTopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7fafc;
`;

const ChatTopInnerContainer = styled.div`
  width: 85%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatTopWrapImgText = styled.div`
  display: flex;
  align-items: center;
`;

const ChatTopImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 55px;
    height: 55px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const ChatTopTextContainer = styled.div`
  padding-left: 30px;
`;

const ChatTopIconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 150px;
`;

const ChatTopIconContainer = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #f3f3f3;
  transition: all 0.2s ease;

  box-icon {
    width: 22px;
    height: 22px;
  }

  :hover {
    background-color: #e4e4e4;
  }
`;

const ChatMiddleContainer = styled.div`
  padding: 50px 60px;
  overflow-y: auto;
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #6c63ff;
    border-radius: 2px;
  }
  ::-webkit-scrollbar-track {
    background-color: #c6ccdb;
  }

  .storeMessage {
    background-color: #e2e1ff;
  }

  .userMessage {
    justify-content: flex-end;
  }
`;

const ChatMiddleInnerContainer = styled.div`
  display: flex;
`;

const ChatMessageContainer = styled.div`
  margin: 0 0 20px;
  max-width: 400px;
  min-height: 50px;
  padding: 20px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
`;

const ChatBottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  background-image: url("https://www.transparenttextures.com/patterns/gplay.png");
`;

const ChatBottomInnerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  form {
    width: 90%;
    height: 45%;
    display: flex;
    align-items: center;
  }

  input {
    display: flex;
    align-items: center;
    resize: none;
    width: 90%;
    height: 100%;
    outline: none;
    border: none;
    padding: 20px;
    font-size: 14px;
    font-weight: 600;
    color: #434a5e;
    background: white;
    border-radius: 20px;
    box-shadow: 5px 5px 15px -5px rgba(0, 0, 0, 0.3);
    box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
    ::-webkit-scrollbar {
      width: 0 !important;
      height: 0 !important;
    }
  }

  button {
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 60px;
  }
`;
