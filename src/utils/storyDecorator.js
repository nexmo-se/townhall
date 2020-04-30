import React from "react";
import { BrowserRouter } from "react-router-dom";

export default function decorator(storyFn){
  return (
    <BrowserRouter>
      {storyFn()}
    </BrowserRouter>
  )
}