import React, { useState } from "react";
import { createNewRoom } from "../API";

const WelcomeScreenContainer = ({ setAppData }) => {
  const [meetingId, setMeetingId] = useState("");

  const createClick = async () => {
    const meetingId = await createNewRoom();

    setAppData({ mode: "CONFERENCE", meetingId });
  };

  const hostClick = () => setAppData({ mode: "CONFERENCE", meetingId });
  const viewerClick = () => setAppData({ mode: "VIEWER", meetingId });

  return (
    <div>
      <button onClick={createClick}>create new meeting</button>
      <p>{"\\n\\nor\\n\\n"}</p>
      <input
        placeholder="meeting ID"
        onChange={(e) => setMeetingId(e.target.value)}
        value={meetingId}
      />
      <p>{"\\n\\n"}</p>
      <button onClick={hostClick}>Join as Host</button>
      <button onClick={viewerClick}>Join as viewer</button>
    </div>
  );
};

export default WelcomeScreenContainer;
