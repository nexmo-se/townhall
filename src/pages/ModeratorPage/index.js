// @flow
import React from "react";
import User from "entities/user";
import CredentialAPI from "api/credential";

import useStyles from "./styles";
import useSession from "hooks/session";
import useSubscriber from "hooks/subscriber";
import usePublisher from "hooks/publisher";

import LiveBadge from "components/LiveBadge";
import AskNameDialog from "components/AskNameDialog";
import ModeratorChatList from "components/ModeratorChatList";
import ChatInput from "components/ChatInput";
import FullPageLoading from "components/FullPageLoading";
import RaisedHandList from "components/RaisedHandList";
import ParticipantList from "components/ParticipantList";
import LiveParticipantList from "components/LiveParticipantList";
import LiveParticipantItem from "components/LiveParticipantItem";

function ModeratorPage(){
  const [ me, setMe ] = React.useState<User|void>(new User("Moderator", "moderator"));
  const mStyles = useStyles();
  const mSession = useSession();
  const mSubscriber = useSubscriber();
  const mPublisher = usePublisher();

  function handleNameSubmit(user:User){
    setMe(user);
  }

  async function connect(){
    if(me){
      const credential = await CredentialAPI.generateCredential("moderator", me.toJSON())
      await mSession.connect(credential);
    }
  }

  React.useEffect(() => {
    connect();
  }, [ me ]);

  React.useEffect(() => {
    if(mSession.session) mPublisher.publish("main", me);
  }, [ mSession.session ])

  React.useEffect(() => {
    if(mSession.session) mSubscriber.subscribe(mSession.streams, "main");
  }, [ mSession.streams, mSession.session ]);

  if(!me && !mSession.session) {
    return (
      <AskNameDialog 
        pin="5523"
        role="moderator"
        onSubmit={handleNameSubmit}
      />
    )
  }
  else if(me && !mSession.session) return <FullPageLoading />
  else if(me && mSession.session) return (
    <div className={mStyles.container}>
      <div className={mStyles.leftPanel}>
        <div className={mStyles.chat} style={{ 
            borderBottom: "1px solid #e7ebee",
            flexBasis: "50%"
          }}
        >
          <h4 className="Vlt-center">RAISING HAND</h4>
          <RaisedHandList />
        </div>
        <div className={mStyles.chat} style={{ 
            flexBasis: "50%",
            paddingLeft: 32, 
            paddingRight: 32, 
            paddingTop: 32 
          }}
        >
          <h4 className="Vlt-center">MESSAGES</h4>
          <ModeratorChatList filter="approved"/>
          <ChatInput user={me} byPass={true} />
        </div>
      </div>
      <div className={mStyles.centerPanel}>
        <div className={mStyles.chat} style={{ flexBasis: "50%", borderBottom: "1px solid #e7ebee" }}>
          <h4 className="Vlt-center">LIVE PARTICIPANTS</h4>
          <LiveParticipantList subscribers={mSubscriber.subscribers}>
            <LiveParticipantItem user={me} publisher={mPublisher.publisher} />
          </LiveParticipantList>
        </div>
        <div className={mStyles.chat} style={{ flexBasis: "50%", paddingTop: 32 }}>
          <h4 className="Vlt-center">PARTICIPANTS ({mSession.connections.length})</h4>
          <ParticipantList/>
        </div>
      </div>
      <div id="main" className={mStyles.rightPanel}>
        <LiveBadge className={mStyles.liveBadge} />
      </div>
    </div>
  )
}
export default ModeratorPage;