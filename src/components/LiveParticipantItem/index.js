// @flow
import React from "react";
import type { Node } from "react";

import Avatar from 'react-avatar';
import clsx from "clsx";
import User from "entities/user";
import { Publisher, Subscriber } from "@opentok/client";

import useSession from "hooks/session";
import usePublisher from "hooks/publisher";

import VideoButton from "components/VideoButton";
import MuteButton from "components/MuteButton";
import HangupButton from "components/HangupButton";
import ShareScreenButton from "components/ShareScreenButton";

type Props = {
  user:User,
  className?:any,
  publisher?:Publisher,
  subscriber?:Subscriber,
  additionalControls?:Node
}

function LiveParticipantItem({ user, className, publisher, subscriber, additionalControls }:Props){
  const [ hasVideo, setHasVideo ] = React.useState<boolean>(true);
  const [ hasAudio, setHasAudio ] = React.useState<boolean>(true);
  const mSession = useSession();

  function handleVideoClick(){
    if(publisher) publisher.publishVideo(!hasVideo);
    else if(subscriber){
      const { connection } = subscriber.stream;
      const data = JSON.parse(connection.data);
      const user = User.fromJSON(data);
      user.id = connection.id;

      const payload = Object.assign({}, user.toJSON(), { hasVideo: !hasVideo })
      mSession.session.signal({
        type: "force-video",
        data: JSON.stringify(payload)
      })
    }
  }

  function handleAudioClick(){
    if(publisher) publisher.publishAudio(!hasAudio);
    else if(subscriber){
      const { connection } = subscriber.stream;
      const data = JSON.parse(connection.data);
      const user = User.fromJSON(data);
      user.id = connection.id;

      const payload = Object.assign({}, user.toJSON(), { hasAudio: !hasAudio })
      mSession.session.signal({
        type: "force-audio",
        data: JSON.stringify(payload)
      })
    }
  }

  function handleDisconnectClick(){
    if(subscriber){
      const { connection } = subscriber.stream;
      const data = JSON.parse(connection.data);
      const user = User.fromJSON(data);
      user.id = connection.id;

      mSession.session.signal({
        type: "force-unpublish",
        data: JSON.stringify(user.toJSON())
      })
    }
  }

  React.useEffect(() => {
    const pubsub = (publisher)? publisher: (subscriber)? subscriber: null;
    if(pubsub && mSession.changedStream.stream){
      const { connection:localConnection } = pubsub.stream;
      const { connection:remoteConnection } = mSession.changedStream.stream;
      if(localConnection.id === remoteConnection.id){
        setHasVideo(mSession.changedStream.stream.hasVideo);
        setHasAudio(mSession.changedStream.stream.hasAudio);
      }
    }
  }, [ mSession.changedStream ]);

  return (
    <div 
      className={clsx(
        "Vlt-card Vlt-card--plain Vlt-bg-aqua-lighter Vlt-card--lesspadding",
        className
      )}
      style={{ marginTop: 8, marginBottom: 4 }}
    >
      <div className="Vlt-card__content" style={{ display: "flex", flexDirection: "row" }}>
        <Avatar src={`https://api.adorable.io/avatars/285/${user.name}.png`} round={true} size={60} style={{ marginRight: 16 }}/>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 200  }}>
          <p><b>{user.name}</b></p>   
          <div style={{ display: "flex", flexDirection: "row" }}>
            {additionalControls}
            <VideoButton 
              size={32} 
              fontSize={16} 
              style={{ marginRight: 8 }} 
              onClick={handleVideoClick}
              hasVideo={hasVideo}
            />
            <MuteButton 
              size={32} 
              fontSize={16} 
              style={{ marginRight: 8 }} 
              onClick={handleAudioClick}
              hasAudio={hasAudio}
            />
            {subscriber?(
              <HangupButton 
                size={32} 
                fontSize={16} 
                onClick={handleDisconnectClick}
              />
            ):null}
          </div> 
        </div>
      </div>
    </div>
  );
}
export default LiveParticipantItem;