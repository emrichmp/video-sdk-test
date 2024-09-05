//Auth token we will use to generate a meeting and connect to it
export const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJkZTM5NGRhYS02YmZkLTRkMTQtYjU5Yy0zYWFjYjQxZGYxMDQiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyNDkwMDUyNCwiZXhwIjoxNzI1NTA1MzI0fQ.e7ou9_-1BdY8c0rBsNJHs1TPqX3RmuHtHoAmwcmabws";
// API call to create meeting
export const createNewRoom = async () => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  //Destructuring the roomId from the response
  const { roomId } = await res.json();
  return roomId;
};

//Recommend generating token from backend server for deployment
