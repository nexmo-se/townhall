class User{
  
  /**
   * 
   * @param {string} role 
   * @param {string} token 
   */
  constructor(role, token){
    this.role = (!role)? "publisher": role;
    this.token = token;
  }
}
module.exports = User;