export default class CustomError extends Error{
  // name: string
  // message: string
  // code: string
  
  /**
   * 
   * @param {string} name 
   * @param {string} message 
   */
  constructor(name, message){
    super();
    this.name = name;
    this.code = name;
    this.message = message;
  }
}