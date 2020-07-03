// @flow
import React from "react";
import { v4 as uuid } from "uuid"
import type { Node } from "react";
import useSession from "hooks/session";

import User from "entities/user";
import Message from "entities/message";

type Props = { children: Node }

export const MessageContext = React.createContext<any>({});
export default function MessageProvider({ children }:Props){
  const [ forceVideo, setForceVideo ] = React.useState<any>();
  const [ forceAudio, setForceAudio ] = React.useState<any>();
  const [ forceUnpublish, setForceUnpublish ] = React.useState<any>();
  const [ forcePublish, setForcePublish ] = React.useState<any>();
  const [ forcePublishFailed, setForcePublishFailed ] = React.useState<any>();
  const [ raisedHands, setRaisedHands ] = React.useState<Array<User>>([]);
  const [ messages, setMessages ] = React.useState<Array<Message>>([]);
  const mSession = useSession();

  function removeRaisedHand(user:User){
    setRaisedHands((prevRaisedHands) => prevRaisedHands.filter((prevRaisedHand) => {
      return prevRaisedHand.id !== user.id
    }))
  }

  React.useEffect(() => {
    if(mSession.session){
      mSession.session.on("signal:force-video", ({ data }) => {
        const jsonData = JSON.parse(data)
        const user = User.fromJSON(JSON.parse(data));
        setForceVideo({
          token: uuid(),
          hasVideo: jsonData.hasVideo,
          user
        })
      });

      mSession.session.on("signal:force-audio", ({ data }) => {
        const jsonData = JSON.parse(data)
        const user = User.fromJSON(JSON.parse(data));
        setForceAudio({
          token: uuid(),
          hasAudio: jsonData.hasAudio,
          user
        })
      })

      mSession.session.on("signal:force-unpublish", ({ data }) => {
        const user = User.fromJSON(JSON.parse(data));
        setForceUnpublish({
          token: uuid(),
          user
        })
      });

      mSession.session.on("signal:force-publish", ({ data }) => {
        const user = User.fromJSON(JSON.parse(data));
        setForcePublish({
          token: uuid(),
          user
        })
      });

      mSession.session.on("signal:force-publish-failed", ({ data }) => {
        const user = User.fromJSON(JSON.parse(data));
        setForcePublishFailed({ user })
      })

      mSession.session.on("signal:raise-hand", ({ data }) => {
        setRaisedHands((prevRaisedHands) => {
          const jsonData = JSON.parse(data);
          const user = User.fromJSON(jsonData);
          const isNewUser = prevRaisedHands.filter((raisedHand) => raisedHand.id === user.id).length === 0;
          if(isNewUser) return [ ...prevRaisedHands, user ]
          else return prevRaisedHands;
        })
      });

      mSession.session.on("signal:message", ({ data }) => {
        setMessages((prevMessages) => {
          const jsonData = JSON.parse(data);
          const message = Message.fromJSON(jsonData);
          return [ ...prevMessages, message ]
        })
      })
    }
  }, [ mSession.session ])

  return (
    <MessageContext.Provider value={{ 
      forceVideo,
      forceAudio,
      forceUnpublish,
      forcePublish,
      forcePublishFailed,
      raisedHands,
      removeRaisedHand,
      messages
    }}>
      {children}
    </MessageContext.Provider>
  )
}