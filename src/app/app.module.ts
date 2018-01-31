import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';

import { HomePageComponent } from './containers/home-page/home-page.component';
import { UserDetailsPageComponent } from './containers/user-details-page/user-details-page.component';

import { GithubService } from './services/github.service';
import { HomePageService } from './services/home-page.service';
import { UserDetailsPageService } from './services/user-details-page.service';
import { UserListItemComponent } from './components/user-list-item/user-list-item.component';
import { UserSearchBarComponent } from './components/user-search-bar/user-search-bar.component';
import { RepoListItemComponent } from './components/repo-list-item/repo-list-item.component';


// routes
export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',    
    component: HomePageComponent,
    data: { animation: 'home' }
  },
  { path: 'user', redirectTo: 'home' },
  {
    path: 'user/:username',   
    component: UserDetailsPageComponent,
    data: { animation: 'user' }
  }
];

@NgModule({
  declarations: [
    AppComponent,
        
    HomePageComponent,
    UserDetailsPageComponent,
    UserListItemComponent,
    UserSearchBarComponent,
    RepoListItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    MomentModule,
    BrowserAnimationsModule,
  ],
  providers: [GithubService, HomePageService, UserDetailsPageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
