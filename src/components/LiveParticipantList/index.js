// @flow
import React from "react";
import type { Node } from "react"

import useStyles from "./styles";
import User from "entities/user";
import { Subscriber } from "@opentok/client";

import LiveParticipantItem from "components/LiveParticipantItem";

type Props = {
  children?:Node,
  subscribers:Array<Subscriber>
}

function LiveParticipantList({ children, subscribers }:Props){
  const [ participants, setParticipants ] = React.useState<Array<User>>([]);
  const mStyles = useStyles();

  React.useEffect(() => {
    const participants = subscribers.filter((subscriber) => {
      if(subscriber.stream.videoType === "screen") return false;
      else return true;
    }).map((subscriber) => {
      const { connection } = subscriber.stream;
      const data = JSON.parse(connection.data);
      const user = User.fromJSON(data);
      user.subscriber = subscriber;
      return user;
    }).sort((a, b) => {
      if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      else if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      else return 0;
    })
    setParticipants(participants);
  }, [ subscribers ]);

  return (
    <div className={mStyles.container}>
      {children}
      {participants.map((participant) => {
        return <LiveParticipantItem user={participant} subscriber={participant.subscriber} />
      })}
    </div>
  )
}
export default LiveParticipantList;