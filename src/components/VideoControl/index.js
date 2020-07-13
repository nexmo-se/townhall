// @flow
import React from "react";
import clsx from "clsx";
import type { Node } from "react";

import useStyles from "./styles";
import useSession from "hooks/session";
import { Publisher } from "@opentok/client";

import HangupButton from "components/HangupButton";
import MuteButton from "components/MuteButton";
import VideoButton from "components/VideoButton";

type Props = {
  sizeMultiplier?:number,
  publisher:Publisher|void,
  hidden?:boolean,
  children?:Node
}

function VideoControl({ sizeMultiplier=1, publisher, children, hidden=true }:Props){
  const [ hasAudio, setHasAudio ] = React.useState(true);
  const [ hasVideo, setHasVideo ] = React.useState(true);
  const mSession = useSession();
  const mStyles = useStyles();

  function handleVideoClick(){
    setHasVideo((prevVideo) => !prevVideo);
  }

  function handleAudioClick(){
    setHasAudio((prevAudio) => !prevAudio);
  }

  function handleHangupClick(){
    mSession.session.unpublish(publisher);
  }

  React.useEffect(() => {
    const { changedStream } = mSession;
    if(changedStream){
      const { connection:otherConnection } = changedStream.stream;
      const { connection:myConnection } = mSession.session;
      if(otherConnection.id === myConnection.id && publisher?.stream.id === changedStream.stream.id){
        switch(changedStream.changedProperty){
          case "hasAudio": return setHasAudio(changedStream.newValue);
          case "hasVideo": return setHasVideo(changedStream.newValue);
          default: return;
        }
      }
    }
  }, [ mSession.changedStream ]);

  React.useEffect(() => {
    if(publisher) publisher.publishAudio(hasAudio);
  }, [ hasAudio ])

  React.useEffect(() => {
    if(publisher) publisher.publishVideo(hasVideo);
  }, [ hasVideo ]);

  if(!publisher) return null;
  return(
    <div id="video-control" className={mStyles.root}>
      {children}
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
      <HangupButton onClick={handleHangupClick} />
    </div>
  )
}

VideoControl.defaultProps = { sizeMultiplier: 1 }
export default VideoControl;