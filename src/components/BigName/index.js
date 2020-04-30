import React from "react";

function BigName(props){
  const { name, style } = props;

  return (
    <div style={style}>
      <small className="Vlt-white" style={{ margin: 0 }}>MY NAME IS</small>
      <h1 className="Vlt-white" style={{ padding: 0, margin: 0 }}>{name}</h1>
    </div>
  )
}

export default BigName;