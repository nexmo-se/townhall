// @flow
import React from "react";
import type { Node } from "react";

import clsx from "clsx";
import useStyles from "./styles";

type Props = { 
  id:string,
  size:"big"|"small",
  hidden?:boolean,
  screen?:boolean
}

function LayoutContainer({ id, size, hidden, screen }:Props){
  const [ isBig, setIsBig ] = React.useState<boolean>(true);
  const mStyles = useStyles();

  React.useEffect(() => {
    setIsBig(size === "big");
  }, [ size ]);

  return (
    <div id={id} className={clsx(
      mStyles.container,
      mStyles.black,
      (isBig)? mStyles.big: {},
      (hidden)? mStyles.hidden: {},
      (screen)? mStyles.screen: {}
    )}/>
  );
}
export default LayoutContainer;