import React, { useContext, useState } from "react";
import "./SideBar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const SideBar = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const { onSent, previousPropmt, setRecentPropmt, newChat } =
    useContext(Context);

  const loadPropmt = async (prompt) => {
    setRecentPropmt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      {/* top */}
      <div className="top">
        <img
          src={assets.menu_icon}
          alt=""
          className="menu"
          onClick={() => setOpenSideBar(!openSideBar)}
        />
        <div className="new__chat" onClick={() => newChat()}>
          <img src={assets.plus_icon} alt="" />
          {openSideBar && <p>New Chat</p>}
        </div>

        {openSideBar && (
          <div className="recent">
            <p className="recent__title">Recent</p>
            {previousPropmt.map((ele, ind) => (
              <div
                className="recent__entry"
                key={ind}
                onClick={() => loadPropmt(ele)}
              >
                <img src={assets.message_icon} alt="" />
                {ele.length > 18 ? <p>{ele.slice(0, 18)}...</p> : <p>{ele}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* bottom */}
      <div className="bottom">
        <div className="bottom__item recent__entry">
          <img src={assets.question_icon} alt="" />
          {openSideBar && <p>Help</p>}
        </div>

        <div className="bottom__item recent__entry">
          <img src={assets.history_icon} alt="" />
          {openSideBar && <p>Activity</p>}
        </div>

        <div className="bottom__item recent__entry">
          <img src={assets.setting_icon} alt="" />
          {openSideBar && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
