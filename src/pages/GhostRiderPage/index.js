// @flow
import React from "react";
import clsx from "clsx";
import CredentialAPI from "api/credential";
import User from "entities/user";

import useStyles from "./styles";
import useSession from "hooks/session";
import useSubscriber from "hooks/subscriber";

import BigName from "components/BigName";
import LiveBadge from "components/LiveBadge";
import VonageLogo from "components/VonageLogo"
import BlackLayer from "components/BlackLayer";
import WhiteLayer from "components/WhiteLayer";
import ChatList from "components/ChatList";
import FullPageLoading from "components/FullPageLoading";

function EmployeePage(){
  const [ me ] = React.useState<User|void>(new User("Ghost Rider", "participant"));
  const [ layout, setLayout ] = React.useState<string>("default");
  const mSession = useSession();
  const mStyles = useStyles();
  const mSubscriber = useSubscriber();

  async function connect(){
    if(me){
      const credential = await CredentialAPI.generateCredential("publisher", me.toJSON());
      await mSession.connect(credential);
    }
  }

  React.useEffect(() => {
    connect();
  }, [ me ]);

  React.useEffect(() => {
    if(mSession.session) mSubscriber.subscribe(mSession.streams);
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

  if(me && !mSession.session) return <FullPageLoading />
  else if(me && mSession.session) return (
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
        <BigName name={me.name} style={{ position: "absolute", top: 32, left: 32, zIndex: 2 }}/>
        <div className={mStyles.logoContainer}>
          <LiveBadge/>
        </div>
        <VonageLogo style={{ position: "absolute", bottom: 32, right: 32, zIndex: 2 }}/>
      </div>
      <div className={mStyles.rightContainer}>
        <div className={mStyles.moderator}>
          <div id="moderator" className={mStyles.videoContainer}/>
        </div>
        <div className={mStyles.chatContainer}>
          <ChatList/>
        </div>
      </div>
    </div>
  )
}
export default EmployeePage;