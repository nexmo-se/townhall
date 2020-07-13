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

function usePublisher(containerId:string, autoLayout?:boolean=true):ReturnValue{
  const [ publisher, setPublisher ] = React.useState<Publisher>();
  const [ stream, setStream ] = React.useState<Stream>();
  const [ layoutManager, setLayoutManager ] = React.useState<LayoutManager>(new LayoutManager(containerId));
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
    try{
      if(!mSession.session) throw new Error("You are not connected to session");
      const options = { insertMode: "append" };
      const finalOptions = Object.assign({}, options, extraData);
      const publisher = mSession.session.publish(containerId,finalOptions);
      publisher.on("destroyed", handleDestroyed);
      publisher.on("streamCreated", handleStreamCreated);
      publisher.on("streamDestroyed", handleStreamDestroyed);
      setPublisher(publisher);
    }catch(err){
      if(err.name === "OT_USER_MEDIA_ACCESS_DENIED"){
        if(onAccessDenied) onAccessDenied(user);
        alert("Please enable camera and microphone permissions to continue. Please refresh the page.");
      }else throw err;
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