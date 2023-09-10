// import { connectServer } from "src/utils";

export async function getAllRooms(client) {
  try {
    const rooms = await client.getJoinedRooms();
    return rooms;
  } catch (err) {
    console.log(err);
  }
}

//Receive each chat room information
export async function getAllMembers(client, rooms) {
  const userId = client.getUserId();
  // const member = await server.getJoinedRoomMembers(rooms.joined_rooms[0]);
  try {
    const chatList = await Promise.all(
      rooms.joined_rooms.map(async (roomId) => {
        const data = await client.getJoinedRoomMembers(roomId);
        return Object.keys(data.joined)
          .filter((key) => key != userId)
          .map((key) => {
            return {
              roomId: roomId,
              userId: key,
              name: data.joined[key].display_name,
              avatar: data.joined[key].avatar_url, // 修正拼写
              isOnline: false,
              msg: [],
              unSeenMsg: 0,
            };
          });
      })
    );
    return chatList.filter((item) => item.length > 0);
  } catch (err) {
    console.log(err);
  }
}

export function sendMessage(client, roomId, message) {
  const content = {
    body: message,
    msgtype: "m.text",
  };
  client.sendEvent("roomId", "m.room.message", content, "", (err, res) => {
    console.log(err);
  });
}
