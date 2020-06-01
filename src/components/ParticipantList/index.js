// @flow
import React from "react";
import User from "entities/user";

import useStyles from "./styles";
import useSession from "hooks/session";

import ParticipantItem from "components/ParticipantItem";

function ParticipantList(){
  const [ participants, setParticipants ] = React.useState<Array<User>>([]);
  const mSession = useSession();
  const mStyles = useStyles();

  React.useEffect(() => {
    const participants = mSession.connections.map((connection) => {
      const data = JSON.parse(connection.data);
      const user = User.fromJSON(data);
      user.connection = connection;
      user.id = connection.id;
      return user;
    }).sort((a, b) => {
      if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
      else if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      else return 0;
    })
    setParticipants((participants));
  }, [ mSession.connections ]);

  return (
    <div className={mStyles.container}>
      {participants.map((participant) => {
        return <ParticipantItem user={participant} />
      })}
    </div>
  )
}
export default ParticipantList;