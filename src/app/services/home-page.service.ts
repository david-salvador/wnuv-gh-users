import { Injectable } from '@angular/core';
import { Router } from "@angular/router";


import { GithubService } from './github.service'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HomePageService {
    
  constructor(private router:Router, private githubService:GithubService) { 
    console.log(`HomePageService constructed`);
  }

  getUsers(username:string):Observable<any>{
    return this.githubService.getUsers(username || 'david');
  }

  navigateToUsername(username:string){
    console.log(username);
    this.router.navigate([`user/${username}`]);
  }

}
