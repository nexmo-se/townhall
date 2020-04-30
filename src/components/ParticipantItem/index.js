// @flow
import React from "react";
import Avatar from 'react-avatar';
import User from "entities/user";
import useSession from "hooks/session";

import RoundedButton from "components/RoundedButton";

type Props = { 
  user:User
};
function ParticipantItem({ user }:Props){
  const [ isPublishing, setIsPublishing ] = React.useState<boolean>(true);
  const [ isInviting, setIsInviting ] = React.useState<boolean>(false);
  const mSession = useSession();

  async function handleInviteClick(){
    try{
      setIsInviting(true);
      if(!user.id) throw new Error("User does not have ID. Is someone hack my application");
      if(mSession.session){
        await new Promise((resolve, reject) => {
          mSession.session.signal({
            type: "force-publish",
            data: JSON.stringify(user.toJSON())
          }, (err) => {
            if(err) reject(err);
            else resolve();
          });
        });
      }
    }catch(err){
      console.log(err);
    }finally{
      setIsInviting(false)
    }
  }

  React.useEffect(() => {
    if(user.role !== "moderator"){
      const isPublishing = mSession.streams.filter((stream) => {
        const { connection } = stream;
        if(connection.id === user.id) return true;
        else return false;
      }).length > 0
      setIsPublishing(isPublishing);
    }
  }, [ mSession.streams ])

  return (
    <div className="Vlt-card Vlt-card--plain Vlt-bg-aqua-lighter Vlt-card--lesspadding" style={{ marginTop: 8, marginBottom: 4 }}>
      <div className="Vlt-card__content" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Avatar src={`https://api.adorable.io/avatars/285/${user.name}.png`} round={true} size={50} style={{ marginRight: 16 }}/>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 200  }}>
          <p><b>{user.name}</b></p>    
          {(isPublishing)? null: (
            <button 
              className="Vlt-btn" 
              style={{ margin: 0 }}
              disabled={isInviting}
              onClick={handleInviteClick}
            >
              Invite live
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default ParticipantItem;