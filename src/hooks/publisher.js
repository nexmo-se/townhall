// @flow
import React from "react";
import OT, { Publisher, Stream } from "@opentok/client";
import User from "entities/user";
import useSession from "hooks/session";

type Props = {
  publish:Function,
  publisher:Publisher,
  stream:Stream
}

function usePublisher():Props{
  const [ publisher, setPublisher ] = React.useState<Publisher>();
  const [ stream, setStream ] = React.useState<Stream>();
  const mSession = useSession();

  function handleDestroyed(){
    setPublisher(undefined);
  }

  function handleStreamCreated({ stream }){
    setStream(stream);
  }

  function handleStreamDestroyed(){
    setStream(null);
  }

  async function publish(containerId:string, user:User, nameDisplayMode?:string="on", extraData?:any){
    if(!mSession.session) throw new Error("You are not connected to session");
    const publisher = await new Promise((resolve, reject) => {
      const options = {
        insertMode: "append",
        width: "100%",
        height: "auto",
        name: user.name,
        style: { 
          buttonDisplayMode: "off",
          nameDisplayMode 
        }
      }
      const finalOptions = Object.assign({}, options, extraData);
      const publisher = OT.initPublisher(containerId, finalOptions, (err) => {
        if(err) reject(err);
        else resolve(publisher);
      });
    });

    publisher.on("destroyed", handleDestroyed);
    publisher.on("streamCreated", handleStreamCreated);
    publisher.on("streamDestroyed", handleStreamDestroyed);

    await new Promise((resolve, reject) => {
      mSession.session.publish(publisher, (err) => {
        if(err) reject(err);
        else resolve();
      })
    });

    setPublisher(publisher);
  }

  return { publish, publisher, stream }
}
export default usePublisher;