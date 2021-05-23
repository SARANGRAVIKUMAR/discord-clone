import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Add,
  Call,
  Headset,
  InfoOutlined,
  Mic,
  Settings,
  SignalCellularAlt,
} from "@material-ui/icons";
import SidebarChannel from "./SidebarChannel";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import db, { auth } from "./firebase";

const Sidebar = () => {
  const user = useSelector(selectUser);

  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      )
    );
  }, []);

  const handleAddChannel = (e) => {
    // e.preventDefault();
    const channelName = prompt("Enter the new Channel");
    if (channelName) {
      db.collection("channels").add({
        channelName: channelName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar_top">
        <h3>Sarang</h3>
        <ExpandMoreIcon />
      </div>
      <div className="sidebar_channels">
        <div className="sidebar_channelsHeader">
          <div className="sidebar_header">
            <ExpandMoreIcon />
            <h4>Text channels</h4>
          </div>
          <Add onClick={handleAddChannel} className="sidebar_addChannel" />
        </div>
        <div className="sidebar_channelList">
          {console.log(channels)}
          {channels.map((channel) => (
            <SidebarChannel
              id={channel.id}
              channel={channel.channel.channelName}
            />
          ))}
        </div>
      </div>
      <div className="sidebar_voice">
        <SignalCellularAlt className="sidebar_voiceIcon" fontSize="large" />
        <div className="sidebar_voiceInfo">
          <h3>voice connected</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar_voiceIcons">
          <InfoOutlined />
          <Call />
        </div>
      </div>
      <div className="sidebar_profile">
        <Avatar onClick={() => auth.signOut()} src={user.photo} />
        <div className="sidebar_profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>
        <div className="sidebar_profileIcons">
          <Mic />
          <Headset />
          <Settings />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
