import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { myUserId } from "../../utils";
import { Avatar } from "src/components";

const ChatText = ({ message, sendMessage, roomId, listRef }) => {
  const inputRef = useRef(null);
  const [text, setText] = useState("");

  useEffect(() => {
    //monitor input height
    const monitorFunc = (e) => {
      e.preventDefault();
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
      if (inputRef.current.scrollHeight <= 200) {
        inputRef.current.style.overflow = "hidden";
      } else {
        inputRef.current.style.overflow = "auto";
      }

      console.log(inputRef.current.parentElement.parentElement.offsetHeight);
      listRef.current.scrollTop = listRef.current.scrollHeight + 100;
      listRef.current.style.maxHeight -=
        inputRef.current.parentElement.parentElement.offsetHeight + "px";
    };

    //monitor enter key
    const keyPressFunc = (e) => {
      if (e.key === "Enter") {
        if (!e.shiftKey) {
          e.preventDefault();
          inputRef.current.nextElementSibling.click();
        } else {
        }
      }
    };

    inputRef.current.addEventListener("input", monitorFunc);
    inputRef.current.addEventListener("keypress", keyPressFunc);
    return () => {
      inputRef.current.removeEventListener("input", monitorFunc);
      inputRef.current.removeEventListener("keyPress", keyPressFunc);
    };
  }, []);

  return (
    <div className="h-[730px] flex flex-col justify-end overflow-y-auto scroll-smooth">
      {/* 聊天记录 */}
      <div
        ref={listRef}
        className="overflow-y-auto overflow-x-hidden max-h-[730px]"
      >
        {message?.map((item, i) => {
          return (
            <div
              key={i}
              className="flex flex-col my-2 "
              onMouseEnter={() => {
                document.getElementById(`chat-${i}`).style.opacity = "1";
              }}
              onMouseLeave={() =>
                (document.getElementById(`chat-${i}`).style.opacity = "0")
              }
            >
              <div className="relative ">
                <Avatar
                  className={`absolute bottom-0 ${
                    item.sender === myUserId ? "right-2" : "left-2"
                  }`}
                  src={
                    item.avatar
                      ? item.avatar
                      : item.sender === myUserId
                      ? "/avatar.jpg"
                      : "/avatar2.png"
                  }
                  showStatus={false}
                />
                <div
                  className={`chat ${
                    item.sender === myUserId ? "chat-end" : "chat-start"
                  }`}
                >
                  <div
                    className={`chat-bubble max-w-[350px] rounded-lg text-sm min-h-0 whitespace-pre-line break-words ${
                      item.sender === myUserId
                        ? "chat-bubble-accent right-14"
                        : "left-14"
                    }`}
                  >
                    {`${item.content}`}
                  </div>
                </div>
              </div>
              <div
                id={`chat-${i}`}
                className={`flex transition-opacity duration-300 opacity-0 ${
                  item.sender === myUserId ? "ml-auto mr-14" : "mr-auto ml-14"
                }`}
              >
                <button className="btn btn-ghost btn-sm min-h-0 h-[24px] w-[24px] rounded-full p-0 m-0 ">
                  <Icon icon="basil:forward-solid" width={15} />
                </button>
                {item.sender === myUserId || (
                  <button className="btn btn-ghost btn-sm min-h-0 h-[24px] w-[24px] rounded-full p-0 m-0">
                    <Icon icon="ic:baseline-reply" width={15} />
                  </button>
                )}
                <button className="btn btn-ghost btn-sm min-h-0 h-[24px] w-[24px] rounded-full p-0 m-0">
                  <Icon
                    icon="fluent:emoji-add-16-filled"
                    width={15}
                    color="#ccc"
                  />
                </button>
                {item.sender === myUserId && (
                  <button className="btn btn-ghost btn-sm min-h-0 h-[24px] w-[24px] rounded-full p-0 m-0">
                    <Icon icon="ic:round-delete" width={15} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* 聊天输入框 */}
      <div className="border-t mt-2">
        <div
          className="flex items-end w-full p-2 h-full space-x-0.5"
          action="submit"
        >
          <button className="btn btn-ghost btn-sm rounded-full h-[35px] ">
            <Icon icon="mingcute:add-fill" width={18} />
          </button>
          <button className="btn btn-ghost btn-sm rounded-full h-[35px]">
            <Icon icon="mdi:emoji-lol-outline" width={18} />
          </button>
          <form action="submit" className="flex flex-grow space-x-0.5">
            <textarea
              onChange={(e) => setText(e.target.value)}
              ref={inputRef}
              rows={1}
              value={text}
              className="p-2 textarea textarea-xs w-full textarea-bordered resize-none h-auto min-h-[30px] max-h-[500px] whitespace-pre-wrap"
              placeholder="Send a message"
            ></textarea>
            <button
              type="submit"
              className="btn btn-ghost btn-sm rounded-full h-[35px]"
              onClick={async (e) => {
                e.preventDefault();
                await sendMessage(text, roomId);
                // listRef.current.scrollTop = listRef.current.scrollHeight + 100;
                setText("");
                inputRef.current.style.height = "auto";
              }}
            >
              <Icon icon="bxs:send" width={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatText;
