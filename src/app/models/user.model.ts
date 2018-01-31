export class User {
//export interface User {

  username:string;
  avatar_url:string;
  followers?:string;
  repositories?:string[];

  constructor(o?: any){
      this.username   = o && o.login        || null;
      this.avatar_url = o && o.avatar_url   || null;
  }

}


/*



*/