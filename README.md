# WnuvGhUsers

This project exercises the Github API to search users by login 

running demo at: [www.ecix.es/labs/01_ng5_lab_github_user_search_01](http://www.ecix.es/labs/01_ng5_lab_github_user_search_01)

## Welcome to the wnuv-gh-users wiki!

A web application in Angular 5.2 that consumes Github API

# Requirements:
1. There must be a search bar to let the user search by username (login name)
1. After the search is completed, the application displays the list of users along with their avatar and their username on the same page
1. When a list item is clicked, the application navigates to a new page that displays a simple list with all the user 
 details.
1. The new page will also display the list of the user's repositories and followers.
1. The application has to be responsive and optimized for mobile
1. Documentation on how the application works and how to set up and build the project must be provided
1. The search input does the searching as you type (See google search as an example)
1. There is animated transition between pages
1. The application supports theming and can easily be switched between themes
1. The application style is built using Bootstrap v4
1. All pages' URL is reusable - meaning it can be copied and pasted on different browser and still shows the same result

# Technical Design
![Overview Diagram](https://raw.githubusercontent.com/david-salvador/wnuv-gh-users/master/src/assets/documentation/overview01.png)


## HomePage
This Container element includes a 
1. search bar to let the user search by username (login name)
1. list of users along with their avatar and their username on the same page

When a list item is clicked, the application navigates to a new page that displays a simple list with all the user 
 details.

### Component userSearchBar
In order to allow to search while typing on the userSearchBar, keyup events are channeled through streams to declare behaviours that do not overload nor generate failed searches.

`

    Observable.fromEvent(this.textInputElement.nativeElement, 'keyup')

    .pipe(
        map((e:any) => e.target.value),
        filter((text:string) => text.length > 2),
        debounceTime(200),
        tap((text:string)=> this.search_text_query.next(text))
    ).subscribe()

`
The resulting Observable (rxjs stream) is mapped to a stream of text values of the input text field, of which only values with more than 2 characters are considered values worthy of consideration, and thus the filter operator is piped in.

Only when the user has remained 200ms without modifying the input field, to provide a sense of interactive responsiveness, we allow new values to go through. This is also to avoid converting into actual server requests values which are not intended to be actual requests.

Only the remaning stream values are side-effected into web api requests, delegated into the HomePageService to remove logic from visual container elements. (See HomePageService below)


## UserDetailsPage
The aim of this page container element is to:

1. display a list of profile details for the user clicked back in HomePage
1. display a list of the user's public repositories and the number of followers for each repository
1. allow deep linking to the user profile by referencing the url (reusable URL)

This page container element does not delegate logic to the injected service UserDetailsPageService, with the aim of allowing code reuse with other apps.

## HomePageService
Isolates the HomePage Container component from reusable logic and interaction with other services, in particular in this project with the GithubService.

## UserDetailsPageService
Isolates the UserDetailsPage Container component from reusable logic and interaction with other services, in particular in this project with the GithubService.

## GithubService
Encapsulates web interaction with the Github public API.
For development purposes it includes a boolean flag to use mocked data and relieve the abuse constraints set by Github without having to use the credentials between developers.


# Installation

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
