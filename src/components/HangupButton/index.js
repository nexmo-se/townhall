import React from "react";
import posed from "react-pose";

import PhoneDisabledIcon from '@material-ui/icons/PhoneDisabled';

function HangupButton(props){
  const { size, fontSize } = props;
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
    if(props.onClick) props.onClick()
  }

  return (
    <Container 
      pose={isBig? "big": "small"} className="Vlt-bg-red Vlt-white" style={styles.hangup}
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
      <PhoneDisabledIcon fontSize="inherit"/>
    </Container>
  )
}

HangupButton.defaultProps = { size: 50, fontSize: 24 }
export default HangupButton;