import { Injectable } from '@angular/core';
import { GithubService } from './github.service'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserDetailsPageService {

  constructor(private githubService:GithubService) { 
    console.log(`HomePageService constructed`);    
  }

  getUserDetails(username:string):Observable<any>{    
    return this.githubService.getUserDetails(username);    
  }

  getUserRepos(username:string):Observable<any>{
    return this.githubService.getUserRepos(username);
  }
  
}
