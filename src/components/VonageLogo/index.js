import React from "react";

function VonageLogo(props){
  const { style } = props;

  const styles = {
    default: { display: "flex", flexDirection: "column" }, 
    logo: {
      background: `url(${process.env.PUBLIC_URL}/assets/images/vonage.png)`,
      backgroundPosition: "center", backgroundSize: "contain", height: 50, width: 100,
      backgroundRepeat: "no-repeat"
    }
  }

  return (
    <div style={{ ...styles.default, ...style }}>
      <small style={{ color: "black" }}>Powered By</small>
      <div style={styles.logo}/>
    </div>
  )
}
export default VonageLogo;