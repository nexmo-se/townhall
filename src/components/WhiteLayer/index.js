import React from "react";

function WhiteLayer(){
  const styles = {
    default: {
      position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1,
      background: "linear-gradient(0deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%)" 
    }
  }
  return <div style={styles.default}/>
}
export default WhiteLayer;