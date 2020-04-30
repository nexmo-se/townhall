// @flow
import React from "react";
import OT, { Publisher, Stream } from "@opentok/client";
import User from "entities/user";
import useSession from "hooks/session";

type Props = {
  publish:Function,
  publisher:Publisher
}

function usePublisher():Props{
  const [ publisher, setPublisher ] = React.useState<Publisher>();
  const mSession = useSession();

  function handleDestroyed(){
    setPublisher(undefined);
  }

  async function publish(containerId:string, user:User){
    if(!mSession.session) throw new Error("You are not connected to session");
    const publisher = await new Promise((resolve, reject) => {
      const publisher = OT.initPublisher(containerId, {
        insertMode: "append",
        width: "100%",
        height: "auto",
        style: { nameDisplayMode: "off" }
      }, (err) => {
        if(err) reject(err);
        else resolve(publisher);
      });
    });

    publisher.on("destroyed", handleDestroyed);

    await new Promise((resolve, reject) => {
      mSession.session.publish(publisher, (err) => {
        if(err) reject(err);
        else resolve();
      })
    });

    setPublisher(publisher);
  }

  return { publish, publisher }
}
export default usePublisher;