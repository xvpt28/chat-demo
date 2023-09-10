import React from "react";
import { ContactOverview } from "src/components";

const ChatHeader = (props) => {
  return (
    <div>
      <ContactOverview {...props} />
    </div>
  );
};

export default ChatHeader;
