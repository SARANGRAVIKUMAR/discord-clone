import {
  EditLocationRounded,
  EditRounded,
  HelpRounded,
  Notifications,
  PeopleAltRounded,
  SearchRounded,
  SendRounded,
} from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import "./ChatHeader.css";

const ChatHeader = ({ channelName }) => {
  return (
    <div className="chatHeader">
      <div className="chatHeader_left">
        <h3>
          <span className="chatHeader_hash">#</span>
          {channelName}
        </h3>
      </div>
      <div className="chatHeader_right">
        <Notifications />
        <EditLocationRounded />
        <PeopleAltRounded />
        <div className="chatHeader_search">
          <input type="text" placeholder="search" />
          <SearchRounded />
        </div>
        <SendRounded />
        <HelpRounded />
      </div>
    </div>
  );
};

export default ChatHeader;
