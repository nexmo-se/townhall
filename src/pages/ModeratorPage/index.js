// @flow
import React from "react";
import clsx from "clsx";
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
import ShareScreenButton from "components/ShareScreenButton";

function ModeratorPage(){
  const [ me, setMe ] = React.useState<User|void>(new User("Moderator", "moderator"));
  const [ layout, setLayout ] = React.useState<string>("default");
  const mStyles = useStyles();
  const mSession = useSession();
  const mSubscriber = useSubscriber();
  const mPublisher = usePublisher();
  const mScreenPublisher = usePublisher();

  function handleNameSubmit(user:User){
    setMe(user);
  }

  async function connect(){
    if(me){
      const credential = await CredentialAPI.generateCredential("moderator", me.toJSON())
      await mSession.connect(credential);
    }
  }

  async function handleShareScreenClick(){
    if(mSession.session && !mScreenPublisher.stream){
      const screenUser = new User("sharescreen", "sharescreen");
      await mScreenPublisher.publish("screen", screenUser, "off", { videoSource: "screen" });
    }else if(mSession.session && mScreenPublisher.stream){
      mSession.session.unpublish(mScreenPublisher.publisher);
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

  React.useEffect(() => {
    const screenSubscribers = mSubscriber.subscribers.filter((subscriber) => {
      const { stream } = subscriber;
      if(stream.videoType === "screen") return true;
      else return false;
    });
    if(screenSubscribers.length > 0) setLayout("sharescreen")
    else setLayout("default");
  }, [ mSubscriber.subscribers ]);

  React.useEffect(() => {
    if(mScreenPublisher.stream) setLayout("sharescreen")
    else setLayout("default");
  }, [ mScreenPublisher.stream ])

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
            <LiveParticipantItem 
              user={me} 
              publisher={mPublisher.publisher} 
              additionalControls={(
                <ShareScreenButton 
                  size={32}
                  fontSize={16}
                  style={{ marginRight: 8 }}
                  onClick={handleShareScreenClick}
                  isSharing={!!mScreenPublisher.stream}
                />
              )}
            />
          </LiveParticipantList>
        </div>
        <div className={mStyles.chat} style={{ flexBasis: "50%", paddingTop: 32 }}>
          <h4 className="Vlt-center">PARTICIPANTS ({mSession.connections.length})</h4>
          <ParticipantList/>
        </div>
      </div>
      <div className={mStyles.rightPanel}>
        <div 
          id="screen" 
          className={clsx(
            mStyles.videoContainer,
            (layout === "sharescreen")? mStyles.visible: mStyles.hidden
          )} 
        />
        <div 
          id="main"
          className={clsx(
            mStyles.videoContainer,
            (layout === "sharescreen")? mStyles.smallVideoContainer: ""
          )}
        />
        <LiveBadge className={mStyles.liveBadge} />
      </div>
    </div>
  )
}
export default ModeratorPage;