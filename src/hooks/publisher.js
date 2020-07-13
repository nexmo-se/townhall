// @flow
import React from "react";
import LayoutManager from "utils/layout-manager";
import OT, { Publisher, Stream } from "@opentok/client";
import User from "entities/user";
import useSession from "hooks/session";

type ReturnValue = {
  publish:Function,
  unpublish:Function,
  publisher:Publisher,
  stream:Stream,
  layoutManager:LayoutManager
}

function usePublisher(containerId:string, autoLayout?:boolean=true, displayName?:boolean=true):ReturnValue{
  const [ publisher, setPublisher ] = React.useState<Publisher>();
  const [ stream, setStream ] = React.useState<Stream>();
  const [ layoutManager, setLayoutManager ] = React.useState<LayoutManager>(new LayoutManager(containerId));
  const [ onAccessDenied, setOnAccessDenied ] = React.useState<Function|void>();
  const [ nameDisplayMode, setNameDisplayMode ] = React.useState<boolean>(displayName);
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

  function handleAccessDenied(){
    alert("Please enable camera and microphone access to conitnue. Refresh the page when you are done.");
    if(onAccessDenied) onAccessDenied();
  }

  async function unpublish(){
    if(publisher) mSession.session.unpublish(publisher);
    else throw new Error("Cannot unpublish. No publisher found");
    layoutManager.layout();
  }

  async function publish(
    user:User, 
    extraData?:any,
    onAccessDenied?:(user:User) => void
  ){
    setOnAccessDenied(onAccessDenied);
    try{
      if(!mSession.session) throw new Error("You are not connected to session");
      const options = { 
        insertMode: "append",
        name: user.name,
        style: { 
          buttonDisplayMode: "off",
          nameDisplayMode: displayName? "on": "off"
        }
      };
      const finalOptions = Object.assign({}, options, extraData);
      const publisher = mSession.session.publish(containerId,finalOptions);
      publisher.on("destroyed", handleDestroyed);
      publisher.on("streamCreated", handleStreamCreated);
      publisher.on("streamDestroyed", handleStreamDestroyed);
      publisher.on("accessDenied", handleAccessDenied)
      setPublisher(publisher);
    }catch(err){
      console.log(err.stack);
    }
  }

  React.useEffect(() => {
    try{
      if(autoLayout && stream && publisher) {
        const { videoType } = stream;
        const element = document.getElementById(publisher.id);
        if(element && videoType === "screen") element.classList.add("OT_big");
      }
      layoutManager.layout();
    }catch(err){
      console.log(err.stack);
    }
  }, [ publisher, stream ])

  return { 
    unpublish, 
    publish, 
    publisher, 
    stream,
    layoutManager
  }
}
export default usePublisher;