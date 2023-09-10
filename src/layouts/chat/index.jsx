// internal import
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Avatar, ContactOverview } from "src/components";
import ChatContainer from "./chat-container";
// import { connectServer } from "src/api";

//global import
import "react-loading-skeleton/dist/skeleton.css";
import { Icon } from "@iconify/react";
import { connectServer, myUserId } from "src/utils";
import { getAllRooms, getAllMembers } from "src/api/chatApi";

const server = await connectServer({ initialSyncLimit: 10 });

const Chat = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [chatListInfo, setChatListInfo] = useState([]);
  const [isExpend, setIsExpend] = useState(true);
  const [roomData, setRoomData] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [userInfo, setUserInfo] = useState(null); // [avatar, name
  const listRef = useRef(null);

  useEffect(() => {
    (async () => {
      //change user status
      server.once("sync", function (state, prevState, res) {
        if (state === "PREPARED") {
          //获取用户信息
          const user = server.getUser(server.getUserId());
          setUserInfo({
            avatar: user?.avatarUrl ? user.avatarUrl : "/avatar.jpg",
            name: user.displayName,
            isOnline: user.currentlyActive,
            userId: user.userId,
          });
          setIsLoading(false);
        } else {
          setIsOnline(false);
          process.exit(1);
        }
      });

      //get all rooms and rooms info
      const rooms = await getAllRooms(server);
      const allMember = await getAllMembers(server, rooms);
      setRoomData(() => allMember);
      setCurrentRoom(() => rooms.joined_rooms[0]);

      //监听初始化
      server.on("Room.timeline", function (event, room, toStartOfTimeline) {
        if (toStartOfTimeline) {
          return; // don't print paginated results
        }
        if (event.getType() !== "m.room.message") {
          return; // only use messages
        }

        //当消息传入时，修改响应数据
        setRoomData((prev) =>
          prev.map((item) => {
            if (item[0].roomId === event.sender.roomId) {
              return [
                {
                  ...item[0],
                  msg: [
                    ...item[0].msg,
                    {
                      content: event.event.content.body,
                      sender: event.event.sender,
                      avatar: event.sender.getAvatarUrl(),
                    },
                  ],
                },
              ];
            } else {
              return item;
            }
          })
        );
      });

      //监听用户上线
      server.on("User.presence", function (event, user) {
        setChatListInfo((prev) => {
          if (user.userId === myUserId) return prev;
          return [
            ...prev,
            {
              userId: user.userId,
              isOnline: user.presence === "online",
            },
          ];
        });
      });

      await server.startClient({ initialSyncLimit: 100 });
    })();
  }, []);

  //后续监听
  useEffect(() => {
    const timelineListener = (event, room, toStartOfTimeline) => {
      if (toStartOfTimeline) {
        return; // don't print paginated results
      }
      if (event.getType() !== "m.room.message") {
        return; // only use messages
      }

      if (event.sender.roomId !== currentRoom) {
        setRoomData((prev) =>
          prev.map((item) => {
            if (item[0].roomId === event.sender.roomId) {
              return [
                {
                  ...item[0],
                  unSeenMsg: item[0].unSeenMsg + 1,
                },
              ];
            } else {
              return item;
            }
          })
        );
      }
    };
    if (isLoading) return;
    server.on("Room.timeline", timelineListener);

    return () => {
      server.removeListener("Room.timeline", timelineListener);
    };
  }, [isLoading, currentRoom]);

  //清空未读消息
  useEffect(() => {
    listRef.current.scrollTop = listRef.current.scrollHeight + 100;
    setRoomData((prev) =>
      prev.map((item) => {
        if (item[0].roomId === currentRoom) {
          return [
            {
              ...item[0],
              unSeenMsg: 0,
            },
          ];
        } else {
          return item;
        }
      })
    );
  }, [currentRoom]);

  const integratedData = useMemo(() => {
    if (chatListInfo.length === 0) {
      return roomData;
    }
    return roomData.map((item) => {
      return item.map((item2) => {
        const targetUser = chatListInfo.find((item3) => {
          return item3.userId === item2.userId;
        });
        return {
          ...item2,
          isOnline: targetUser?.isOnline,
        };
      });
    });
  }, [roomData, chatListInfo, currentRoom]);

  useEffect(() => {
    listRef.current.scrollTop = listRef.current.scrollHeight + 100;
  }, [integratedData]);

  const sendMessage = async (content, roomId) => {
    if (!content || !roomId) return;
    const contentToSend = {
      body: content,
      msgtype: "m.text",
    };
    server.sendEvent(
      roomId,
      "m.room.message",
      contentToSend,
      "",
      (err, res) => {
        console.log(err);
      }
    );
  };

  const ExpendJsx = (isExpend) => {
    return (
      <div className="flex">
        <button className="btn btn-sm btn-ghost rounded-md">
          <Icon
            icon={isExpend ? "ep:arrow-left-bold" : "ep:arrow-right-bold"}
          />
        </button>
      </div>
    );
  };

  return (
    <div className="w-screen h-screen center bg-bg-light">
      <div className="bg-white h-1/2 min-h-[800px] min-w-[1200px] shadow-xl flex rounded-2xl overflow-hidden">
        {/* Left Part */}
        <div className="w-1/4 flex flex-col border-r space-y-4">
          {/* Avatar */}
          <div className="flex items-center justify-between mt-4 mx-4">
            <Avatar src={userInfo?.avatar} online={userInfo?.isOnline} />
            {ExpendJsx(isExpend)}
          </div>
          {/* Search */}
          <div className="relative mx-4">
            <Icon
              icon="mdi:search"
              className="absolute text-lg text-[#8e8e8e] top-1.5 left-1.5"
            />
            <input
              type="text"
              placeholder="Search Contacts..."
              className="input input-bordered input-sm w-full max-w-xs pl-7 placeholder:text-xs"
            />
          </div>
          {/* contactList */}
          <div className="h-full">
            {integratedData.map((item) => {
              return (
                <ContactOverview
                  online={item[0].isOnline}
                  onClick={() => setCurrentRoom(item[0].roomId)}
                  key={item[0].userId}
                  src={item[0].avatar ? item.avatar : "/avatar2.png"}
                  name={item[0].name}
                  isSelect={item[0].roomId === currentRoom}
                  msg={item[0].unSeenMsg}
                />
              );
            })}
          </div>
        </div>

        {/* Right Part */}
        <div className="w-3/4">
          <ChatContainer
            src={userInfo?.avatar}
            online={userInfo?.isOnline}
            name={userInfo?.name}
            subtitle={userInfo?.isOnline ? "Online" : "Offline"}
            sendMessage={sendMessage}
            roomId={currentRoom}
            message={integratedData.find(
              (item) => item[0].roomId === currentRoom
            )}
            listRef={listRef}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
