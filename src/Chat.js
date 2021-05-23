import {
  AddCircle,
  CardGiftcard,
  EmojiEmotions,
  GifOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import {
  selectChannelId,
  selectChannelName,
  setChannelInfo,
} from "./features/appSlice";
import { selectUser } from "./features/userSlice";
import db from "./firebase";
import Messages from "./Messages";
import firebase from "firebase";

const Chat = () => {
  const user = useSelector(selectUser);
  const channelInfo = useSelector(setChannelInfo);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("channels")
      .doc(channelInfo.payload.app.channelId)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user,
      });

    setInput("");
  };

  useEffect(() => {
    if (channelInfo.payload.app.channelId) {
      db.collection("channels")
        .doc(channelInfo.payload.app.channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelInfo.payload.app.channelId]);

  return (
    <div className="chat">
      <ChatHeader channelName={channelInfo.payload.app.channelName} />
      <div className="chat_messages">
        {console.log(messages)}
        {messages.map((message) => (
          <Messages message={message.message} user={user} timestamp={message.timestamp} />
        ))}
      </div>
      <div className="chat_input">
        <AddCircle fontSize="large" />
        <form>
          <input
            disabled={!channelInfo.payload.app.channelId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder={`message test chanel`}
          />
          <button
            onClick={sendMessage}
            className="chat_inputButton"
            type="submit"
          >
            Send Message
          </button>
        </form>
        <div className="chat_inputIcons">
          <CardGiftcard fontSize="large" />
          <GifOutlined fontSize="large" />
          <EmojiEmotions fontSize="large" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
