import React from "react";
import posed from "react-pose";

import ShareScreenIcon from '@material-ui/icons/ScreenShare';

function ShareScreenButton({ onClick, size, fontSize, style, isSharing }){
  const [ isBig, setIsBig ] = React.useState(false);

  const styles = { 
    hangup: { 
      width: size,
      height: size, 
      borderRadius: "50%", 
      cursor: "pointer",
      fontSize: fontSize, 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center"
    }
  }

  const Container = posed.div({
    big: { scale: 1.1 },
    small: { scale: 1 }
  });

  const handleMouseEnter = () => setIsBig(true);
  const handleMouseLeave = () => setIsBig(false);
  const handleClick = () => {
    if(onClick) onClick();
  }

  return (
    <Container 
      pose={isBig? "big": "small"} 
      className={`${isSharing? "Vlt-bg-green": "Vlt-bg-red"} Vlt-white`} 
      style={{ ...styles.hangup, ...style }}
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
      onClick={handleClick}
    >
      <ShareScreenIcon fontSize="inherit" />  
    </Container>
  )
}

ShareScreenButton.defaultProps = { size: 50, fontSize: 24 }
export default ShareScreenButton;