import { Component, ElementRef,ViewChild ,HostListener} from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routerAnimation', [
      transition('* <=> *', [
        // Initial state of new route
        query(':enter',
          style({
            position: 'fixed',
            width:'100%',
            transform: 'translateX(-100%)'
          }),
          {optional:true}),
        // move page off screen right on leave
        query(':leave',
          animate('500ms ease',
            style({
              position: 'fixed',
              width:'100%',
              transform: 'translateX(-100%)',
              opacity: 0,
            })
          ),
        {optional:true}),
        // move page in screen from left to right
        query(':enter',
          animate('500ms ease',
            style({
              opacity: 1,
              transform: 'translateX(0%)'
            })
          ),
        {optional:true}),
      ])
    ])
  ]
})
export class AppComponent {
  
  public darkTheme:boolean = false;
  private innerHeight:string;
  public footerHeight:string;

  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation
  }

  @ViewChild('minavbar')
  minavbar: ElementRef;

  @ViewChild('mirouteroutlet')
  mirouteroutlet: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerHeight = event.target.innerHeight;
  }

  onSetTheme(themeName:string){    
    this.darkTheme = themeName=='dark'?true:false;
    event.preventDefault();
    this.innerHeight = (window.innerHeight) + "px";
    this.footerHeight = (window.innerHeight - this.minavbar.nativeElement.offsetHeight - this.mirouteroutlet.nativeElement.offsetHeight) + "px";    //console.log('window.innerHeight:',window.innerHeight,'this.minavbar.nativeElement.offsetHeight:',this.minavbar.nativeElement.offsetHeight,'this.mirouteroutlet.nativeElement.height:',this.mirouteroutlet.nativeElement.height)
  }
}
