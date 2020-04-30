import React from "react";

function BlackLayer(){
  const styles = {
    default: {
      position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1,
      background: "linear-gradient(180deg, rgba(44,45,48,0.5) 0%, rgba(255,255,255,0) 15%)" 
    }
  }
  return <div style={styles.default}/>
}
export default BlackLayer;