// @flow
import React from "react"
import MessageAPI from "api/message";
import useMessage from "hooks/message";

import ChatBubble from "components/ChatBubble";
import PendingChatBubble from "components/PendingChatBubble";

function ChatList(){
  const mMessage = useMessage();
  const list = React.useRef<any>(null);

  const styles = {
    container: {
      display: "flex", flexDirection: "column", overflowY: "scroll",
      width: "100%", flex: 1, paddingTop: 16, paddingBottom: 16
    }
  }

  const handleRenderItem = ({ sender, text, isApproved }) => {
    if(isApproved) return <ChatBubble name={sender.name} message={text}/>
  }

  React.useEffect(() => {
    list.current.scrollTop = list.current.scrollHeight;
  }, [ mMessage.messages ])

  return(
    <div ref={list} style={styles.container}>
      {mMessage.messages.map((message) => {
        if(message.isApproved){
          return <ChatBubble name={message.sender.name} message={message.text} />
        }
      })}
    </div>
  )
}

export default ChatList;