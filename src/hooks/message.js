// @flow
import React from "react";
import { MessageContext } from "contexts/message";

export default function useMessage(){
  return React.useContext(MessageContext);
}