import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { HttpHeaders } from '@angular/common/http/src/headers';

import { Observable } from 'rxjs/Observable';
import { tap, map, catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import { User } from '../models/user.model';

import { mock_users, mock_user_detail, mock_repos } from './mock.data';


@Injectable()
export class GithubService {

  private USERS_IN_SEARCH_RESULT:number = 12;

  //To avoid being blocked by abusing the API withouth credentials use  USE_API_MOCK_DATA = true, below. It will feed mock data. 
  private USE_API_MOCK_DATA:boolean=false;
  private mockUsers:any      = mock_users;
  private mockUserDetail:any = mock_user_detail;
  private mockUserRepos:any  = mock_repos;

  constructor(private http:HttpClient) { 
    console.log(`GithubService constructed`);
  }

  getUsers(username:string){

    if(this.USE_API_MOCK_DATA){
      return Observable.of(this.mockUsers);
    }

    let apiUrl:string = `https://api.github.com/search/users`;

    let queryParams:string = [
      `q=${username}`,
      `page=1`,
      `per_page=${this.USERS_IN_SEARCH_RESULT}`,
    ].join('&');
      
    return this.http
    .get<any>(`${apiUrl}?${queryParams}`)
    .pipe(      
      map(users => users.items),      
      catchError((error: any) => Observable.throw(error.json()))
    );

  }

  getUserDetails(username:string = 'david'){
    if(this.USE_API_MOCK_DATA){
      return Observable.of(this.mockUserDetail);
    }
    let apiUrl:string = `https://api.github.com/users`;
    
    let queryParams:string = [
      `${username}`,      
    ].join('&');
    
    return this.http    
    .get<any>(`${apiUrl}/${queryParams}`)    
    .pipe(      
      catchError((error: any) => Observable.throw(error.json()))
    );
  }

  getUserRepos(username:string = 'david'){

    if(this.USE_API_MOCK_DATA){
      return Observable.of(this.mockUserRepos);
    }

    let apiUrl:string = `https://api.github.com/users`;
    
    let queryParams:string = [
      `${username}`,      
    ].join('&');
    
    return this.http
    .get<any>(`${apiUrl}/${queryParams}/repos`)    
    .pipe(      
      catchError((error: any) => Observable.throw(error.json()))
    );
  }

}
