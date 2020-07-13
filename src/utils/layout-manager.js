// @flow
import LM from "opentok-layout-js";

class LayoutManager{
  container:string;
  manager:any;

  constructor(container:string){
    this.container = container;
  }

  init(){
    const element = document.getElementById(this.container);
    if(element) this.manager = LM(element, { 
      fixedRatio: true, 
      bigFirst: false,
      bigFixedRatio: true,
      bigAlignItems: "left"
    });
    else throw new Error("Cannot find container");
  }

  layout(){
    if(!this.manager) this.init();
    this.manager.layout();
    console.log(`Layouting ${this.container}`)
  }
}
export default LayoutManager;