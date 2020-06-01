// @flow
import React from "react";
import useMessage from "hooks/message";

import ChatBubble from "components/ChatBubble";
import PendingChatBubble from "components/PendingChatBubble";

type Props = { filter:string }

function ModeratorChatList({ filter }:Props){
  const mMessage = useMessage();
  const list = React.useRef<any>(null);

  const styles = {
    container: {
      display: "flex", flexDirection: "column", overflowY: "scroll",
      width: "100%", height: "100%", paddingTop: 16, paddingBottom: 16,
      flex: 1
    }
  }

  const handleRenderItem = ({ sender, text, isApproved }) => {
    if(isApproved && filter === "approved") return <ChatBubble name={sender.name} message={text}/>
    else if(!isApproved && filter === "pending") return <PendingChatBubble name={sender.name} message={text}/>
  }

  React.useEffect(() => {
    list.current.scrollTop = list.current.scrollHeight;
  }, [ mMessage.messages ])

  return(
    <div ref={list} style={styles.container}>
      {mMessage.messages.map(handleRenderItem)}
    </div>
  )
}

export default ModeratorChatList;