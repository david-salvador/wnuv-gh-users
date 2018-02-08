import { Component, OnInit } from '@angular/core';

import { HomePageService } from '../../services/home-page.service'
import { Observable } from 'rxjs/Observable';
import { tap, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  //private users$:Observable<any>;
  public users:any[];
  
  constructor(private pageService:HomePageService) { }

  ngOnInit() {   
    this.searchTextQuery('david');
  }

  searchTextQuery(event){    
    this.pageService.getUsers(event).subscribe((users:any) => {
      this.users = users;
    });;
  }

  userClicked(event){    
    this.pageService.navigateToUsername(event.login);
  }

}
