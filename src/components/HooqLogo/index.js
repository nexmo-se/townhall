import React from "react";

function HooqLogo(){
  const styles = {
    default: {
      height: 50, width: 100, background: `url(${process.env.PUBLIC_URL}/assets/images/hooq.webp)`,
      backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "contain"
    }
  }

  return <div style={styles.default}/>
}
export default HooqLogo;