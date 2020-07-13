// @flow
import React from "react";
import clsx from "clsx";
import CredentialAPI from "api/credential";
import User from "entities/user";

import useStyles from "./styles";
import useSession from "hooks/session";
import useSubscriber from "hooks/subscriber";
import usePublisher from "hooks/publisher";
import useMessage from "hooks/message";

import LiveBadge from "components/LiveBadge";
import VonageLogo from "components/VonageLogo"
import WhiteLayer from "components/WhiteLayer";
import ChatList from "components/ChatList";
import ChatInput from "components/ChatInput";
import FullPageLoading from "components/FullPageLoading";
import AskNameDialog from "components/AskNameDialog";
import VideoControl from "components/VideoControl";
import RaiseHandButton from "components/RaiseHandButton";
import LayoutContainer from "components/LayoutContainer";

function EmployeePage(){
  const [ me, setMe ] = React.useState<User|void>();
  const mSession = useSession();
  const mStyles = useStyles();
  const mPublisher = usePublisher("cameraContainer", true, false);
  const mMessage = useMessage();
  const mSubscriber = useSubscriber({
    moderator: "moderatorContainer",
    camera: "cameraContainer",
    screen: "cameraContainer"
  });

  function handleNameSubmit(user:User){
    setMe(user);
  }

  async function connect(){
    if(me){
      const credential = await CredentialAPI.generateCredential("publisher", me.toJSON());
      await mSession.connect(credential);
    }
  }

  function handleAccessDenied(){
    if(me){
      mSession.session.signal({
        type: "force-publish-failed",
        data: JSON.stringify(me.toJSON())
      })
    }
  }

  React.useEffect(() => {
    connect();
  }, [ me ]);

  React.useEffect(() => {
    if(mSession.session) mSubscriber.subscribe(mSession.streams);
  }, [ mSession.streams, mSession.session ]);

  React.useEffect(() => {
    if(mMessage.forceVideo){
      if(mMessage.forceVideo.user.id === mSession.session.connection.id){
        mPublisher.publisher.publishVideo(mMessage.forceVideo.hasVideo)
      } 
    }
  }, [ mMessage.forceVideo ]);

  React.useEffect(() => {
    if(mMessage.forceAudio){
      if(mMessage.forceAudio.user.id === mSession.session.connection.id){
        mPublisher.publisher.publishAudio(mMessage.forceAudio.hasAudio)
      } 
    }
  }, [ mMessage.forceAudio ]);

  React.useEffect(() => {
    if(mSession.session && mMessage.forcePublish){
      const { connection:localConnection } = mSession.session;
      const { user } = mMessage.forcePublish;
      if(localConnection.id === user.id && !mPublisher.publisher){
        mPublisher.publish("cameraContainer", user, handleAccessDenied);
      }
    }
  }, [ mSession.session, mMessage.forcePublish ]);

  React.useEffect(() => {
    if(mMessage.forceUnpublish){
      if(mMessage.forceUnpublish.user.id === mSession.session.connection.id){
        if(!mPublisher.publisher) throw new Error("No publisher found");
        mPublisher.unpublish()
      }
    }
  }, [ mMessage.forceUnpublish ]);

  if(!me && !mSession.session) {
    return (
      <AskNameDialog 
        pin="1123"
        role="participant"
        onSubmit={handleNameSubmit}
      />
    )
  }
  else if(me && !mSession.session) return <FullPageLoading />
  else if(me && mSession.session) return (
    <div className={mStyles.container}>
      <div className={mStyles.leftContainer}>
        <LayoutContainer id="cameraContainer" size="big" />        
        <WhiteLayer />
        <div className={mStyles.logoContainer}>
          <LiveBadge/>
          {!mPublisher.publisher? <RaiseHandButton />: null}
        </div>
        <VonageLogo style={{ position: "absolute", bottom: 32, right: 32, zIndex: 2 }}/>
      </div>
      <div className={mStyles.rightContainer}>
        <div className={mStyles.moderator}>
          <LayoutContainer id="moderatorContainer" size="big" />
        </div>
        <div className={mStyles.videoControl}>
          {!mPublisher.publisher? null: (
            <React.Fragment>
              <h4 className="Vlt-center">My Controls</h4>
              <VideoControl publisher={mPublisher.publisher} />
            </React.Fragment>
          )}
        </div>
        <div className={mStyles.chatContainer}>
          <ChatList/>
          <ChatInput user={me} byPass={false}/>
        </div>
      </div>
    </div>
  )
}
export default EmployeePage;