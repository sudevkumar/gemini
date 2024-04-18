import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (prop) => {
  const [input, setInput] = useState("");
  const [recentPropmt, setRecentPropmt] = useState("");
  const [previousPropmt, setPreviousPropmt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [bottom, setBottom] = useState(false);

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setBottom(true);
    let res;
    if (prompt !== undefined) {
      res = await runChat(prompt);
      setRecentPropmt(prompt);
    } else {
      setPreviousPropmt((prev) => [...prev, input]);
      setRecentPropmt(input);
      res = await runChat(input);
    }
    let resArray = res.split("**");
    let newRes = "";
    for (let i = 0; i < resArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newRes += resArray[i];
      } else {
        newRes += "<b>" + resArray[i] + "</b>";
      }
    }
    let newRes2 = newRes.split("*").join("</br>");
    let newResArray = newRes2.split(" ");
    for (let i = 0; i < newResArray.length; i++) {
      const nextWord = newResArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
    setBottom(false);
    setInput("");
  };

  const contextValue = {
    setInput,
    setPreviousPropmt,
    onSent,
    setRecentPropmt,
    recentPropmt,
    showResult,
    loading,
    resultData,
    input,
    previousPropmt,
    newChat,
    bottom,
  };

  return (
    <Context.Provider value={contextValue}>{prop.children}</Context.Provider>
  );
};

export default ContextProvider;
