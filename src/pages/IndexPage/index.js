// @flow
import React from "react";
import clsx from "clsx";
import config from "config";

import useStyles from "./styles";

import Button from "../../components/Button";
import VonageLogo from "components/VonageLogo";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

function IndexPage() {
  const mStyles = useStyles();
  const { push } = useHistory();

  return (
    <React.Fragment>
      <div className={mStyles.container}>
        <VonageLogo
          style={{
            position: "absolute",
            bottom: 32,
            right: 32,
            zIndex: 2,
          }}
        />
        <br />
        <h1>Welcome to the Vonage Townhall!</h1>
        <p>
          Please use the links below to get to the pages for the appropriate
          roles.
        </p>
        <br />
        <Button
          text="Participant"
          onClick={() => {
            push("/participant");
          }}
        />
        <Button
          text="Moderator"
          onClick={() => {
            push("/moderator");
          }}
        />
        <Button
          text="Presenter"
          onClick={() => {
            push("/presenter");
          }}
        />
      </div>
    </React.Fragment>
  );
}
export default IndexPage;
