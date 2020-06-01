// @flow
import React from "react";
import clsx from "clsx";
import posed from "react-pose";
import useStyles from "./styles";
import { default as Loader } from "react-spinners/BounceLoader";

type Props = {
  size?:number,
  fontSize?:number,
  loading?:boolean,
  active?:boolean,
  onClick?:Function,
  className?:any,
  children:any
}

function ControlButton({ size=50, fontSize=24, loading, active, onClick, className, children, ...props }:Props){
  const [ isBig, setIsBig ] = React.useState(false);
  const mStyles = useStyles({ size, fontSize });

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
      {...props}
      pose={isBig? "big": "small"} 
      className={clsx(
        "Vlt-white",
        active && !loading? "Vlt-bg-green": !active && !loading? "Vlt-bg-red": "",
        loading? "Vlt-bg-grey": "",
        mStyles.icon
      )}
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
      onClick={handleClick}
      disabled={loading}
    >
      {loading? <Loader size={fontSize} color="white" />: children}
    </Container>
  )
}

export default ControlButton;