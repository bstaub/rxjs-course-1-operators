import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {concat, fromEvent, interval, noop, Observable, of, timer} from 'rxjs';
import {createHttpObservable} from '../common/util';
import {map} from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {


  constructor() { }

  ngOnInit() {


      const source1$ = of(1,2,3);
      const source2$ = of(3,4,6);
      // const source3$ = of(7,8,9);
      const source3$ = interval(1000);


      const result$ = concat(source1$, source2$, source3$);

      // result$.subscribe(val => console.log(val));
      result$.subscribe(console.log);


  }



}
