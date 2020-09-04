// @flow
import React from "react";
import clsx from "clsx";
import config from "config";

import useStyles from "./styles";

import Button from "../../components/Button";

function IndexPage(){
  return (
    <React.Fragment>
      <div className={}>
        <VonageLogo 
            style={{ 
              position: "absolute", 
              bottom: 32, 
              right: 32,
              zIndex: 2 
            }}
        />
        <br/>
        <h1>Welcome to the Vonage Townhall!</h1>
        <p>Please use the links below to get to the pages for the appropriate roles.</p>
        <br/>
      </div>
    </React.Fragment>
  )
}
export default IndexPage;
