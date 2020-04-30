import React from "react";
import clsx from "clsx";
import posed from "react-pose";

function LiveBadge(props){
  const { style, className } = props;
  const [ isVisible, setIsVisible ] = React.useState(true);
  
  const toggleVisible = () => setIsVisible((isVisible) => !isVisible);

  const Circle = posed.span({
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  })

  React.useState(() => {
    setInterval(toggleVisible, 1000);
    return function cleanup(){
      clearInterval(toggleVisible);
    }
  }, [])

  return (
    <div 
      className={clsx(
        "Vlt-badge Vlt-bg-red Vlt-badge--large",
        className
      )}
      style={{ ...style }}
    >
      <Circle pose={isVisible? "visible": "hidden"}>⚬</Circle>&nbsp;LIVE
    </div>
  )

}
export default LiveBadge;