// @flow
import React from "react";
import { v4 as uuid } from "uuid";
import OT, { Session, Stream, Connection } from "@opentok/client";
import type { Node } from "react";

import Credential from "entities/credential";

type Props = {
  children: Node
}

export const SessionContext = React.createContext<any>({});
function SessionProvider({ children }:Props){
  const [ isConnected, setIsConnected ] = React.useState<boolean>(false);
  const [ session, setSession ] = React.useState<Session>();
  const [ changedStream, setChangedStream ] = React.useState<any>();
  const [ streams, setStreams ] = React.useState<Array<Stream>>([]);
  const [ connections, setConnections ] = React.useState<Array<Connection>>([]);

  function handleStreamPropertyChanged({ stream, changedProperty, newValue, oldValue }){
    setChangedStream({ stream, changedProperty, newValue, oldValue, token: uuid() });
  }

  function handleConnectionCreated({ connection }){
    setConnections((prevConnections) => [ ...prevConnections, connection ]);
  }

  function handleConnectionDestroyed({ connection }){
    setConnections((prevConnections) => {
      return prevConnections.filter((prevConnection) => {
        return prevConnection.id !== connection.id;
      })
    })
  }

  function handleStreamCreated({ stream }){
    setStreams((prevStreams) => [ ...prevStreams, stream]);
  }

  function handleStreamDestroyed({ stream }){
    setStreams((prevStreams) => {
      return prevStreams.filter((prevStream) => {
        return prevStream.id !== stream.id
      })
    })
  }

  async function connect(credential:Credential){
    try{
      const session = OT.initSession(credential.apiKey, credential.sessionId);
      
      session.on("streamPropertyChanged", handleStreamPropertyChanged);
      session.on("streamCreated", handleStreamCreated);
      session.on("streamDestroyed", handleStreamDestroyed);
      session.on("connectionCreated", handleConnectionCreated);
      session.on("connectionDestroyed", handleConnectionDestroyed);
      
      await new Promise((resolve, reject) => {
        session.connect(credential.token, (err) => {
          if(err) reject(err);
          else resolve();
        })
      });
      setSession(session);
      setIsConnected(true);
    }catch(err){
      console.log(err);
      setIsConnected(false);
    }
  }

  return (
    <SessionContext.Provider value={{
      connect,
      session,
      changedStream,
      isConnected,
      streams,
      connections
    }}>
      {children}
    </SessionContext.Provider>
  )
}
export default SessionProvider