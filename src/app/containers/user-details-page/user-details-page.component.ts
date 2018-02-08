import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { UserDetailsPageService } from '../../services/user-details-page.service'
import { Observable } from 'rxjs/Observable';
import { tap, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.scss']
})
export class UserDetailsPageComponent implements OnInit {

  private user$:Observable<any>;
  public user:any;
  private repos:any;

  private username:string;

  constructor(private pageService:UserDetailsPageService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params
    .pipe(
      tap(params => console.log('udp params>',params)),
    )
    .subscribe(params => this.username=params.username)

    this.user$ = this.pageService.getUserDetails(this.username);    
    this.user$.pipe(
      tap(user => console.log('udp>',user)),
    )
    .subscribe((user:any) => {
      this.user = user;
    });

    this.pageService.getUserRepos(this.username).pipe(
      tap(repos => console.log('udp_rs>',repos)),
    ).subscribe(repos => this.repos = repos);

  }

}
