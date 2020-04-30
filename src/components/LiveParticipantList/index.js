// @flow
import React from "react";
import User from "entities/user";
import type { Node } from "react";
import { Subscriber } from "@opentok/client";

import useStyles from "./styles";
import useSession from "hooks/session";

import LiveParticipantItem from "components/LiveParticipantItem";

type Props = {
  children?:Node,
  subscribers:Array<Subscriber>
}

function LiveParticipantList({ children, subscribers }:Props){
  const [ participants, setParticipants ] = React.useState<Array<User>>([]);
  const mSession = useSession();
  const mStyles = useStyles();

  React.useEffect(() => {
    const participants = subscribers.map((subscriber) => {
      const { connection } = subscriber.stream;
      const data = JSON.parse(connection.data);
      const user = User.fromJSON(data);
      user.subscriber = subscriber;
      return user;
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