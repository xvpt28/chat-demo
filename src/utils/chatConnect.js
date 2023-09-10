export const myUserId = "@xvpt28:4d2.org";

export default async function connectServer() {
  console.log("Loading browser sdk");

  const myAccessToken = "syt_eHZwdDI4_gUHWSWLKuWPjCTFjRXnl_1SDEZY";
  const client = matrixcs.createClient({
    baseUrl: "https://matrix.4d2.org/",
    accessToken: myAccessToken,
    userId: myUserId,
  });

  client.publicRooms(function (err, data) {
    console.log("this is public rooms");
    console.log("Public Rooms: %s", JSON.stringify(data));
  });

  await client.startClient({ initialSyncLimit: 10 });

  return client;
}
