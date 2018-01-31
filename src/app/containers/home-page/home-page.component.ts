import { Component, OnInit } from '@angular/core';

import { HomePageService } from '../../services/home-page.service'
import { Observable } from 'rxjs/Observable';
import { tap, map, catchError } from 'rxjs/operators';
//import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

//import { Pizza } from '../../models/pizza.model';
//import { PizzasService } from '../../services/pizzas.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  private users$:Observable<any>;
  public users:any[];
  

  constructor(private pageService:HomePageService) { 

  }

  ngOnInit() {
    /*
    this.users$ = this.pageService.getUsers('');
    //this.users$.subscribe(console.log);
    this.users$
    .pipe(
      tap(users => console.log('hp>',users)),
    )
    .subscribe((users:any) => {
      this.users = users;
    });
    */
    //return this.users$;
    this.searchTextQuery('david');
  }

  searchTextQuery(event){
    //console.log('home-page.searchTextQuery>',event);
    this.pageService.getUsers(event).subscribe((users:any) => {
      this.users = users;
    });;
  }


  userClicked(event){
    //console.log(event.login);
    
    this.pageService.navigateToUsername(event.login);
  }

  


}
