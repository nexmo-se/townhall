// @flow
import React from "react";
import clsx from "clsx";
import posed from "react-pose";

type Props = {
  style?:any,
  className?:any
}

function LiveBadge({ style, className }:Props){
  const [ isVisible, setIsVisible ] = React.useState(true);
  
  const toggleVisible = () => setIsVisible((isVisible) => !isVisible);

  const Circle = posed.span({
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  })

  React.useEffect(() => {
    function toggleVisible(){
      setIsVisible((isVisible) => !isVisible);
    }

    const intervalID = setInterval(toggleVisible, 1000);
    return function cleanup(){
      clearInterval(intervalID);
    }
  }, [])

  return (
    <div 
      className={clsx(
        "Vlt-badge",
        "Vlt-bg-red",
        "Vlt-badge--large",
        "Vlt-white",
        className
      )}
      style={{ ...style }}
    >
      <Circle pose={isVisible? "visible": "hidden"}>⚬</Circle>&nbsp;LIVE
    </div>
  )
}
export default LiveBadge;