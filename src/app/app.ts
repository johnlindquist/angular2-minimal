import {Component} from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/interval";

@Component({
  selector: 'app',
  template: `{{timer$ | async}}`
})
export class AppComponent {
  timer$;

  constructor(){
    this.timer$ = Observable
        .interval(1000);
  }
}
