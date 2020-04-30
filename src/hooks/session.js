// @flow
import React from "react";
import { SessionContext } from "contexts/session";

export default function useSession(){
  return React.useContext(SessionContext);
}