// @flow
import React from "react";
import clsx from "clsx";
import LayoutManager from "utils/layout-manager";
import CredentialAPI from "api/credential";
import User from "entities/user";

import useStyles from "./styles";
import useSession from "hooks/session";
import usePublisher from "hooks/publisher";
import useMessage from "hooks/message";
import useSubscriber from "hooks/subscriber";

import LiveBadge from "components/LiveBadge";
import VonageLogo from "components/VonageLogo"
import WhiteLayer from "components/WhiteLayer";
import ChatList from "components/ChatList";
import ChatInput from "components/ChatInput";
import FullPageLoading from "components/FullPageLoading";
import VideoControl from "components/VideoControl";
import AskNameDialog from "components/AskNameDialog";
import ShareScreenButton from "components/ShareScreenButton";
import LayoutContainer from "components/LayoutContainer";

function CeoPage(){
  const [ user, setUser ] = React.useState<User|void>();
  const [ videoControlVisible, setVideoControlVisible ] = React.useState<boolean>(false);
  const mSession = useSession();
  const mPublisher = usePublisher("cameraContainer", true, false);
  const mScreenPublisher = usePublisher("cameraContainer");
  const mStyles = useStyles();
  const mMessage = useMessage();
  const mSubscriber = useSubscriber({ 
    moderator: "moderatorContainer", 
    camera: "cameraContainer", 
    screen: "cameraContainer" 
  });

  function handleSubmit(user:User){
    setUser(user);
  }

  function handleMouseOver(){
    setVideoControlVisible(true);
  }

  function handleMouseOut(){
    setVideoControlVisible(false);
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
      mScreenPublisher.publish(screenUser, { videoSource: "screen", width: "100%", height: "100%" });
    }else if(mSession.session && mScreenPublisher.stream){
      mScreenPublisher.unpublish();
    }
  }

  React.useEffect(() => {
    if(user) connect()
  }, [ user ]);

  React.useEffect(() => {
    if(mSession.session) mPublisher.publish(user);
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
        mPublisher.unpublish();
      }
    }
  }, [ mMessage.forceUnpublish ])

  React.useEffect(() => {
    if(mSession.session && mMessage.forcePublish){
      const { connection:localConnection } = mSession.session;
      const { user } = mMessage.forcePublish;
      if(localConnection.id === user.id && !mPublisher.publisher){
        mPublisher.publish(user);
      }
    }
  }, [ mSession.session, mMessage.forcePublish ]);

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
        <div className={clsx(mStyles.leftContainer, mStyles.black)}>
          <LayoutContainer id="cameraContainer" size="big" />
          <WhiteLayer/>
          <div className={mStyles.logoContainer}>
            <LiveBadge/>
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
            <LayoutContainer id="moderatorContainer" size="big" />
          </div>
          <div className={mStyles.videoControl}>
            <h4 className="Vlt-center">My Controls</h4>
            <VideoControl 
              publisher={mPublisher.publisher} 
              hidden={!videoControlVisible}
            >
              <ShareScreenButton 
                style={{ marginRight: 8 }}
                onClick={handleShareScreenClick}
                isSharing={!!mScreenPublisher.stream}
              />
            </VideoControl>
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