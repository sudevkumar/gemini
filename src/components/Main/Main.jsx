import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context.jsx";

const Main = () => {
  const {
    setInput,
    onSent,
    recentPropmt,
    showResult,
    loading,
    resultData,
    input,
    bottom
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main__container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, User.</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Create a futuristic image of a car</p>
                <img src={assets.compass_icon} alt="" />
              </div>

              <div className="card">
                <p>Help me plan a game night with 5 friends for under $100</p>
                <img src={assets.bulb_icon} alt="" />
              </div>

              <div className="card">
                <p>Find YouTube videos with inspiring best man speeches</p>
                <img src={assets.message_icon} alt="" />
              </div>

              <div className="card">
                <p>Give me ways to add certain foods to my diet</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result__title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPropmt}</p>
            </div>

            <div className="result__data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className={`main__bottom ${bottom && "bottom"}`}>
          <div className="search__box">
            <input
              type="text"
              placeholder="Enter your prompt here..."
              name=""
              id=""
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input && (
                <img src={assets.send_icon} alt="" onClick={() => onSent()} />
              )}
            </div>
          </div>
          <p className="bottom__info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. <span>Your privacy & Gemini Apps</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
