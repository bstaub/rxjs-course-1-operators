import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {interval, noop, Observable, of, timer} from 'rxjs';
import {catchError, delayWhen, map, filter, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // beginnerCourses: Course[];
  // advancedCourses: Course[];

  // Reactive Way, just define streams of values without subscribe and unsubscribe, this is all handled in the template with async automatically!
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor() {

  }

  ngOnInit() {


    const http$ = createHttpObservable('/api/courses');  // createHttpObservable is own function for easy reuse!!

    // const courses$ = http$  // courses is result of http$
    const courses$: Observable<Course[]> = http$  // courses is result of http$, reactive way needs type Observable<Course[]> ohterwise filter is wrong
      .pipe(
        tap(() => console.log('new http request loaded')),
        map(res => Object.values(res['payload'])),  // turn res['payload'] in array of values..
        shareReplay()
      );

    // third sucscribe, see in network tab, this problem, solves the shareReply() operator, is very common used for handling http requests
    // courses$.subscribe();


    // Version rxjs Reactive, with async in template, much better, sub and unsubscribe automatically in template!! also no nested subscribe :-)
    this.beginnerCourses$ = courses$
      .pipe(
        map(courses => courses.filter(course => course.category === 'BEGINNER'))
      );

    this.advancedCourses$ = courses$
      .pipe(
        map(courses => courses.filter(course => course.category === 'ADVANCED'))
      );

    // Version old with subscribe!
    /*
    courses$.subscribe(
      // courses => console.log(courses),
      courses => {
        this.beginnerCourses = courses.filter(course => course.category === 'BEGINNER');
        this.advancedCourses = courses.filter(course => course.category === 'ADVANCED');
      },
      noop,
      () => console.log('completed')
    );
    */

  }

}
