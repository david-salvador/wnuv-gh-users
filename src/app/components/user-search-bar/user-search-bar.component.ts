import { Component, OnInit, ElementRef, Output, EventEmitter, ViewChild} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { tap, map, catchError, filter } from 'rxjs/operators';
import 'rxjs/add/observable/fromEvent';
import { debounceTime } from 'rxjs/operators/debounceTime';

@Component({
  selector: 'user-search-bar',
  templateUrl: './user-search-bar.component.html',
  styleUrls: ['./user-search-bar.component.scss']
})
export class UserSearchBarComponent implements OnInit {

  @Output()
  public search_text_query: EventEmitter<string>;

  @ViewChild('textInput') private textInputElement: ElementRef;

  constructor(private er:ElementRef) {
    this.search_text_query = new EventEmitter<string>();
  } 

  ngOnInit() {
    Observable.fromEvent(this.textInputElement.nativeElement, 'keyup')
              .pipe(
                map((e:any) => e.target.value),                
                filter((text:string) => text.length > 2),
                debounceTime(200),                
                tap((text:string)=> this.search_text_query.next(text))
              ).subscribe()           
  }
}


//tap((text => console.log('textInput',text))),