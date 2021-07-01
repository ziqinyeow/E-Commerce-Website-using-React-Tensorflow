import React, { useEffect, useState } from "react";
// import * as tf from "@tensorflow/tfjs";
import * as toxicity from "@tensorflow-models/toxicity";
import * as qna from "@tensorflow-models/qna";
import ReactScrollableFeed from "react-scrollable-feed";
import styled from "styled-components";
import stores from "../data/store";
import storeNameNotFound from "../svg/storenamenotfound.svg";
import contactMessage from "../svg/contactmessage.svg";

function Aftersales() {
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [currentStore, setCurrentStore] = useState({});
  const [lastMessage, setLastMessage] = useState("");
  const [qnaModel, setQnaModel] = useState(null);
  const [counter, setCounter] = useState(0);
  const [passageBoxDisplay, setPassageBoxDisplay] = useState(false);
  const [passage, setPassage] = useState("");
  const threshold = 1;
  const [toxicityModel, setToxicityModel] = useState(null);
  const [toxic, setToxic] = useState("");
  const [load, setLoad] = useState(false);

  const loadQnaModel = async () => {
    const loadedQnaModel = await qna.load();
    setQnaModel(loadedQnaModel);
  };

  const loadToxicityModel = async () => {
    const loadedToxicityModel = await toxicity.load(threshold);
    setToxicityModel(loadedToxicityModel);
    setLoad(true);
  };

  useEffect(() => {
    loadQnaModel();
    loadToxicityModel();
    setLoad(false);
  }, []);

  const handleSearch = (event) => {
    const { value } = event.target;
    setInput(value);
    var exact = stores?.filter((found) => {
      return found.name.toLowerCase().includes(value.toLowerCase());
    });
    setSearchResult(exact);
  };

  const handleMessageInput = async (event) => {
    const { value } = event.target;
    setMessageInput(value);
    if (value !== null || value !== "") {
      const predictions = await toxicityModel.classify(value);
      const prob = predictions[6].results[0].probabilities[0];
      if (prob < 0.1) {
        setToxic("Too toxic");
      } else if (prob < 0.3) {
        setToxic("Toxic");
      } else if (prob < 0.6) {
        setToxic("Neutral");
      } else {
        setToxic("Good");
      }
      if (value === "") {
        setToxic("");
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (messageInput !== "") {
      setLastMessage(messageInput);
      currentStore?.messages.push({
        type: "user",
        message: messageInput,
        time: getTime(new Date()),
      });
      setCounter((p) => p + 1);
      setMessageInput("");
      setToxic("");
    }
  };

  const answerQuestion = async () => {
    if (qnaModel !== null && lastMessage !== null) {
      const answer = await qnaModel.findAnswers(lastMessage, passage);
      // console.log(answer);
      if (answer === null || answer.length === 0) {
        currentStore.messages.push({
          type: "bot",
          message:
            "There's no answer to this question, please contact the seller.",
          time: getTime(new Date()),
        });
      } else {
        currentStore.messages.push({
          type: "bot",
          message: answer[0].text,
          time: getTime(new Date()),
        });
      }
      setLastMessage("");
    }
  };

  const handlePassageInputChange = (e) => {
    setPassage(e.target.value);
  };

  const handlePassageChange = (e) => {
    console.log(passage);
    currentStore.passage = passage;
  };

  const closePassageBox = () => {
    setPassageBoxDisplay(false);
  };

  const getTime = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  useEffect(() => {
    setMessageInput("");
    setToxic("");
    setPassage(currentStore.passage);
  }, [currentStore]);

  useEffect(() => {
    answerQuestion();
  }, [counter]);

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
                <ChatTopIconContainer
                  onMouseEnter={() => {
                    setPassageBoxDisplay(true);
                  }}
                  onMouseLeave={() => {
                    setPassageBoxDisplay(false);
                  }}
                >
                  <box-icon
                    name="comment-dots"
                    type="solid"
                    color="#919191"
                    animation="tada-hover"
                  ></box-icon>
                  <PassageBox className={passageBoxDisplay ? "show" : ""}>
                    <textarea
                      cols="30"
                      rows="10"
                      placeholder="The store doesn't include any passage."
                      onChange={handlePassageInputChange}
                      value={passage}
                    ></textarea>
                    <PassageBtnBox>
                      <button onClick={handlePassageChange}>Save</button>
                      <button onClick={closePassageBox}>Close</button>
                    </PassageBtnBox>
                  </PassageBox>
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
          <ReactScrollableFeed>
            <ChatMiddleContainer>
              {currentStore.messages?.map((message, index) => (
                <ChatMiddleInnerContainer
                  className={message.type === "bot" ? "" : "userMessage"}
                >
                  <ChatMessageContainer
                    className={message.type === "bot" ? "storeMessage" : ""}
                  >
                    {message.message}
                    <Time>{message.time}</Time>
                  </ChatMessageContainer>
                </ChatMiddleInnerContainer>
              ))}
            </ChatMiddleContainer>
          </ReactScrollableFeed>
          <ChatBottomContainer>
            <ChatBottomInnerContainer onSubmit={handleSubmit}>
              <form>
                {load ? (
                  <>
                    <ToxicityDisplay
                      style={{
                        transform:
                          messageInput.length === 0 ? "translateY(30px)" : "",
                      }}
                    >
                      {toxic !== "" && "Toxicity : "}
                      {toxic}
                    </ToxicityDisplay>
                    <input
                      type="text"
                      placeholder="Ask a question"
                      onChange={handleMessageInput}
                      value={messageInput}
                    />
                    <button
                      type="submit"
                      disabled={toxic === "Too toxic" || toxic === "Toxic"}
                    >
                      <box-icon
                        name="send"
                        type="solid"
                        color="#6c63ff"
                        animation="tada-hover"
                      ></box-icon>
                    </button>
                  </>
                ) : (
                  <div>Loading...</div>
                )}
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
  position: relative;
  box-icon {
    width: 22px;
    height: 22px;
  }

  :hover {
    background-color: #e4e4e4;
  }

  .show {
    visibility: visible;
    opacity: 1;
  }
`;

const PassageBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 260px;
  height: 250px;
  bottom: -260px;
  right: 0;
  background-color: black;
  z-index: 2;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 16px;
  border-top-right-radius: 0;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background-image: url("https://www.transparenttextures.com/patterns/gplay.png");
  color: #434a5e;
  visibility: hidden;
  text-align: left;
  border-radius: 8px;
  padding: 10px;
  position: absolute;
  z-index: 10;
  opacity: 0;
  transition: all 0.5s ease;

  ::after {
    content: "";
    position: absolute;
    bottom: 92%;
    right: 5%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #6c63ff transparent transparent transparent;
  }

  textarea {
    margin: 5px;
    font-size: 14px;
    font-weight: 500;
    resize: none;
    background-color: white;
    padding: 5px;
    border-radius: 8px;
    border: none;
    outline: none;
  }
`;

const PassageBtnBox = styled.div`
  margin-top: 20px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  button {
    width: 40%;
    padding: 10px;
    border-radius: 8px;
    background-color: #6c63ff;
    color: white;
    border: none;
    outline: none;
    font-size: 17px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    z-index: 30;

    :hover {
      background-color: #514bc0;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
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
  min-width: 100px;
  max-width: 400px;
  min-height: 50px;
  padding: 20px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
  position: relative;
`;

const Time = styled.div`
  position: absolute;
  bottom: 0px;
  right: 5px;
  z-index: 1;
  font-size: 12px;
  font-weight: 200;
  color: #434a5e;
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
  position: relative;

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
    position: relative;
    z-index: 1;
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

const ToxicityDisplay = styled.div`
  position: absolute;
  top: -80%;
  height: 65px;
  width: 200px;
  padding-top: 12px;
  z-index: 0;
  background: blue;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: all 0.5s ease;
  display: flex;
  justify-content: center;
  color: white;
  font-weight: 500;
`;
