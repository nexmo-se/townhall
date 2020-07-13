// @flow
import React from "react";
import LayoutContainer from "components/LayoutContainer";
import LayoutManager from "utils/layout-manager";

type Props = { 
  camera:{ container:string, manager?:LayoutManager },
  screen:{ container:string, manager?:LayoutManager },
  hasScreen:boolean 
}

function MainScreen({ camera, screen, hasScreen }:Props){

  return (
    <React.Fragment>
      <LayoutContainer id={camera.container} size="big" />
    </React.Fragment>
  )
}
export default MainScreen;