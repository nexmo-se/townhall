// @flow

import React from "react";
import useSession from "hooks/session";
import { Publisher, Stream } from "@opentok/client";

import HangupButton from "components/HangupButton";
import MuteButton from "components/MuteButton";
import VideoButton from "components/VideoButton";

type Props = {
  sizeMultiplier?:number,
  style?:any|void,
  publisher:Publisher|void
}

function VideoControl({ sizeMultiplier=1, style, publisher }:Props){
  const [ hasAudio, setHasAudio ] = React.useState(true);
  const [ hasVideo, setHasVideo ] = React.useState(true);
  const mSession = useSession();

  const listener = React.useRef(null);
  const streamPropertyListener = React.useRef(null);

  const styles = {
    container: { 
      width: "100%", padding: 16, display: "flex", 
      flexDirection: "row", alignItems: "center", justifyContent: "center",
      paddingRight: 0,
    }
  }

  function handleVideoClick(){
    setHasVideo((prevHasVideo) => !prevHasVideo);
  }

  function handleAudioClick(){
    setHasAudio((prevHasAudio) => !prevHasAudio);
  }

  function handleHangupClick(){
    mSession.session.unpublish(publisher);
  }

  React.useEffect(() => {
    if(mSession.changedStream.stream){
      const { connection:otherConnection } = mSession.changedStream.stream;
      const { connection:myConnection } = mSession.session;
      console.log(otherConnection.id, myConnection.id);
      if(otherConnection.id === myConnection.id){
        setHasAudio(mSession.changedStream.stream.hasAudio);
        setHasVideo(mSession.changedStream.stream.hasVideo);
      }
    }
  }, [ mSession.changedStream ]);

  React.useEffect(() => {
    if(publisher) publisher.publishAudio(hasAudio);
  }, [ hasAudio ])

  React.useEffect(() => {
    if(publisher) publisher.publishVideo(hasVideo);
  }, [ hasVideo ])

  if(!publisher) return null;
  return(
    <div style={{ ...styles.container, ...style }}>
      <VideoButton 
        hasVideo={hasVideo} 
        onClick={handleVideoClick}
        style={{ marginRight: 8 }}
      />
      <MuteButton 
        hasAudio={hasAudio} 
        onClick={handleAudioClick}
        style={{ marginRight: 8 }}
      />
      <HangupButton 
        onClick={handleHangupClick}
      />
    </div>
  )
}

VideoControl.defaultProps = { sizeMultiplier: 1 }
export default VideoControl;