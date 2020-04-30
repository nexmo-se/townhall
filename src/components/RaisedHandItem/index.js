// @flow
import React from "react";
import Avatar from 'react-avatar';
import User from "entities/user";
import useSession from "hooks/session";
import useMessage from "hooks/message";

type Props = { user:User }

function ParticipantItem({ user }:Props){
  const mSession = useSession();
  const mMessage = useMessage();

  async function handleGoLiveClick(){
    if(!user.id) throw new Error("User does not have ID. Is someone hack my application");
    if(mSession.session){
      await new Promise((resolve, reject) => {
        mSession.session.signal({
          type: "force-publish",
          data: JSON.stringify(user.toJSON())
        }, (err) => {
          if(err) reject(err);
          else resolve();
        })
      });
      mMessage.removeRaisedHand(user);
    }
  }

  return (
    <div className="Vlt-card Vlt-card--plain Vlt-bg-aqua-lighter Vlt-card--lesspadding" style={{ marginTop: 8, marginBottom: 4 }}>
      <div className="Vlt-card__content" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Avatar src={`https://api.adorable.io/avatars/285/${user.name}.png`} round={true} size={50} style={{ marginRight: 16 }}/>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 200  }}>
          <p><b>{user.name}</b></p>    
          <button className="Vlt-btn" style={{ margin: 0 }} onClick={handleGoLiveClick}>
            Go Live
          </button>
        </div>
      </div>
    </div>
  );
}
export default ParticipantItem;