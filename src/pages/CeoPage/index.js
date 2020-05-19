// @flow
import React from "react";
import clsx from "clsx";
import CredentialAPI from "api/credential";
import User from "entities/user";

import useStyles from "./styles";
import useSession from "hooks/session";
import usePublisher from "hooks/publisher";
import useMessage from "hooks/message";
import useSubscriber from "hooks/subscriber";

import BigName from "components/BigName";
import LiveBadge from "components/LiveBadge";
import VonageLogo from "components/VonageLogo"
import BlackLayer from "components/BlackLayer";
import WhiteLayer from "components/WhiteLayer";
import ChatList from "components/ChatList";
import ChatInput from "components/ChatInput";
import FullPageLoading from "components/FullPageLoading";
import VideoControl from "components/VideoControl";
import AskNameDialog from "components/AskNameDialog";
import ShareScreenButton from "components/ShareScreenButton";

function CeoPage(){
  const [ user, setUser ] = React.useState<User|void>(new User("FRANS HUANG", "presenter"));
  const [ layout, setLayout ] = React.useState<string>("default");
  const mSession = useSession();
  const mPublisher = usePublisher();
  const mScreenPublisher = usePublisher();
  const mStyles = useStyles();
  const mMessage = useMessage();
  const mSubscriber = useSubscriber();

  function handleSubmit(user:User){
    setUser(user);
  }

  async function connect(){
    if(user){
      const credential = await CredentialAPI.generateCredential("publisher", user.toJSON());
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
    connect()
  }, [ user ]);

  React.useEffect(() => {
    if(mSession.session) mPublisher.publish("main", user, "off")
  }, [ mSession.session ]);

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
    if(mMessage.forceUnpublish){
      if(mMessage.forceUnpublish.user.id === mSession.session.connection.id){
        if(!mPublisher.publisher) throw new Error("No publisher found");
        mSession.session.unpublish(mPublisher.publisher)
      }
    }
  }, [ mMessage.forceUnpublish ])

  React.useEffect(() => {
    if(mSession.session && mMessage.forcePublish){
      const { connection:localConnection } = mSession.session;
      const { user } = mMessage.forcePublish;
      if(localConnection.id === user.id && !mPublisher.publisher){
        mPublisher.publish("main", user);
      }
    }
  }, [ mSession.session, mMessage.forcePublish ]);

  React.useEffect(() => {
    if(mScreenPublisher.stream) setLayout("sharescreen");
    else setLayout("default")
  }, [ mScreenPublisher.stream ])

  if(!user && !mSession.session){
    return (
      <AskNameDialog 
        pin="3345"
        role="presenter"
        onSubmit={handleSubmit}
      />
    )
  }
  else if(user && !mSession.session) return <FullPageLoading />
  else if(user && mSession.session) return (
    <React.Fragment>
      <div className={mStyles.container}>
        <div className={mStyles.leftContainer}>
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
          <BlackLayer/>
          <WhiteLayer/>
          <BigName 
            name={user.name} 
            style={{ 
              position: "absolute", 
              top: 32, 
              left: 32, 
              zIndex: 2 
            }}
          />
          <div className={mStyles.logoContainer}>
            <LiveBadge/>
            <VideoControl publisher={mPublisher.publisher}>
              <ShareScreenButton 
                style={{ marginRight: 8 }}
                onClick={handleShareScreenClick}
                isSharing={!!mScreenPublisher.stream}
              />
            </VideoControl>
          </div>
          <VonageLogo 
            style={{ 
              position: "absolute", 
              bottom: 32, 
              right: 32,
              zIndex: 2 
            }}
          />
        </div>
        <div className={mStyles.rightContainer}>
          <div className={mStyles.moderator}>
            <div id="moderator" className={mStyles.videoContainer}/>
          </div>
          <div className={mStyles.chatContainer}>
            <ChatList/>
            <ChatInput user={user} byPass={true}/>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default CeoPage;