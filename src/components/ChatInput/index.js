// @flow
import React from "react";
import MessageAPI from "api/message";
import useSession from "hooks/session";

import User from "entities/user";
import Message from "entities/message";

import TextInput from "components/TextInput";
import Button from "components/Button";

type Props = {
  user:User,
  byPass?:boolean
}

function ChatInput({ user, byPass }:Props){
  const [ text, setText ] = React.useState("");
  const mSession = useSession();

  function handleClick(e){
    if(e) e.preventDefault();
    const isApproved = (byPass)? true: false;
    const message = new Message(user, text, isApproved);
    MessageAPI.sendMessage(mSession.session, message);
    setText("");
  }

  return (
    <form style={{ display: "flex", flexDirection: "row" }} onSubmit={handleClick}>
      <TextInput text={text} onChange={setText} style={{ marginRight: 8, flexGrow: 1 }}/>
      <Button type="submit" text="Send" onClick={handleClick} style={{ flexShrink: 1 }}/>
    </form>
  )
}
export default ChatInput;