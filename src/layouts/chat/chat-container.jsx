import React from "react";
import ChatHeader from "./chat-header";
import ChatText from "./chat-text";

const ChatContainer = ({
  name,
  src,
  subtitle,
  message,
  sendMessage,
  roomId,
  listRef,
  online,
}) => {
  return (
    <div className="h-full">
      <div className=" border-b h-[65px] w-full mb-[5px]">
        <ChatHeader src={src} name={name} subtitle={subtitle} online={online} />
      </div>
      <ChatText
        listRef={listRef}
        sendMessage={sendMessage}
        roomId={roomId}
        message={message ? message[0].msg : null}
      />
    </div>
  );
};

export default ChatContainer;
