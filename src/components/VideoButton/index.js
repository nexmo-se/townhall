import React from "react";
import posed from "react-pose";

import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';

function VideoButton(props){
  const { size, fontSize, style, hasVideo } = props;
  const [ isBig, setIsBig ] = React.useState(false);

  const styles = { 
    hangup: { 
      width: size, height: size, borderRadius: "50%", cursor: "pointer",
      fontSize: fontSize, display: "flex", alignItems: "center", justifyContent: "center"
    }
  }

  const Container = posed.div({
    big: { scale: 1.1 },
    small: { scale: 1 }
  });

  const handleMouseEnter = () => setIsBig(true);
  const handleMouseLeave = () => setIsBig(false);
  const handleClick = () => {
    if(props.onClick) props.onClick();
  }

  return (
    <Container 
      pose={isBig? "big": "small"} className={`${hasVideo? "Vlt-bg-green": "Vlt-bg-red"} Vlt-white`} style={{ ...styles.hangup, ...style }}
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
      {hasVideo? <VideocamIcon fontSize="inherit"/>: <VideocamOffIcon fontSize="inherit"/>}
    </Container>
  )
}

VideoButton.defaultProps = { size: 50, fontSize: 24 }
export default VideoButton;