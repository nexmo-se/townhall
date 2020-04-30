// @flow
import React from "react";
import User from "entities/user";

import useStyles from "./styles";
import useMessage from "hooks/message";

import RaisedHandItem from "components/RaisedHandItem";

function ParticipantList(){
  const [ participants, setParticipants ] = React.useState<Array<User>>([]);
  const mMessage = useMessage();
  const mStyles = useStyles();

  React.useEffect(() => {
    setParticipants(mMessage.raisedHands)
  }, [ mMessage.raisedHands ])

  return (
    <div className={mStyles.container}>
      {participants.map((participant) => {
        return <RaisedHandItem user={participant} />
      })}
    </div>
  )
}
export default ParticipantList;