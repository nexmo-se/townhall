// @flow
import React from "react";
import useSession from "hooks/session";
import { Stream, Subscriber } from "@opentok/client";

function useSubscriber(){
  const [ subscribed, setSubscribed ] = React.useState<Array<Stream>>([]);
  const [ subscribers, setSubscribers ] = React.useState<Array<Subscriber>>([]);
  const mSession = useSession();

  function getContainerId(role:string):string{
    if(role === "moderator") return "moderator"
    else return "main"
  }

  async function subscribe(streams:Array<Stream>, overrideContainer?:string){
    setSubscribed(streams);

    const streamIDs = streams.map((stream) => stream.id);
    const subscribedIDs = subscribed.map((stream) => stream.id);

    const newStreams = streams.filter((stream) => !subscribedIDs.includes(stream.id))
    const removedStreams = subscribed.filter((stream) => !streamIDs.includes(stream.id));

    console.log("=========");
    console.log(subscribed)
    console.log(subscribedIDs, streamIDs)
    console.log(newStreams, removedStreams);
    console.log("=========");
    removedStreams.map((stream) => {
      setSubscribers((prevSubscribers) => {
        return prevSubscribers.filter((subscriber) => {
          return !!subscriber.stream
        })
      })
    })

    await Promise.all(newStreams.map(async (stream) => {
      const { connection, videoType } = stream;
      const data = JSON.parse(connection.data);
      const containerId = (videoType === "screen")? "screen": 
                          (overrideContainer)? overrideContainer: getContainerId(data.role)
      const subscriber = await new Promise((resolve, reject) => {
        const subscriber = mSession.session.subscribe(stream, containerId, {
          insertMode: "append",
          width: "100%",
          height: "auto",
          name: data.name,
          style: { 
            buttonDisplayMode: "off",
            nameDisplayMode: "on" 
          }
        }, (err) => {
          if(err) reject(err);
          else resolve(subscriber);
        })
      });
      setSubscribers((prevSubscribers) => [ ...prevSubscribers, subscriber ]);
    }));
  };

  return { subscribe, subscribers }
}
export default useSubscriber;