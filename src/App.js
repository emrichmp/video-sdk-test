import React, { useState } from "react";
import SpeakerScreenContainer from "./screens/speakerScreen/SpeakerScreenContainer";
import ViewerScreenContainer from "./screens/ViewerScreenContainer";
import WelcomeScreenContainer from "./screens/WelcomeScreenContainer";

const App = () => {
  const [appData, setAppData] = useState({ meetingId: null, mode: null });

  return setAppData.meetingId ? (
    appData.mode === "CONFERENCE" ? (
      <SpeakerScreenContainer meetingId={appData.meetingId} />
    ) : (
      <ViewerScreenContainer meetingId={appData.meetingId} />
    )
  ) : (
    <WelcomeScreenContainer setAppData={setAppData} />
  );
};

export default App;

//Conditional Render - determines if speaker or viewer and shows the corresponding component
//based on if there is meetingId and the users mode
// if no meeting Id then will show welcome screen
