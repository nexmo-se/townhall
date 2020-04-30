import React from "react";

import Avatar from 'react-avatar';

function ChatBubble(props){
  const { name, message } = props;

  return (
    <div className="Vlt-card Vlt-card--plain Vlt-bg-orange-lighter Vlt-card--lesspadding" style={{ marginTop: 8, marginBottom: 4 }}>
      <div className="Vlt-card__content" style={{ display: "flex", flexDirection: "row" }}>
        <Avatar src={`https://api.adorable.io/avatars/285/${name}.png`} round={true} size={50} style={{ marginRight: 16 }}/>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 200  }}>
          <p><b>{name}</b></p>
          <p style={{ wordBreak: "break-word", whiteSpace: "normal" }}>{message}</p>
        </div>
      </div>
    </div>
  );
}
export default ChatBubble;