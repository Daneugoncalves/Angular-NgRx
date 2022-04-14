import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { Observable, of } from 'rxjs';
import { Lesson } from '../model/lesson';
import { concatMap, delay, filter, first, map, shareReplay, tap, withLatestFrom } from 'rxjs/operators';
import { CourseEntityService } from '../services/course-entity.service';
import { LeassonEntityService } from '../services/lesson-entity.service';



@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {

  course$: Observable<Course>;

  loading$: Observable<boolean>;

  lessons$: Observable<Lesson[]>;

  displayedColumns = ['seqNo', 'description', 'duration'];

  nextPage = 0;

  constructor(
    private coursesService: CourseEntityService,
    private leassonService: LeassonEntityService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {

    const courseUrl = this.route.snapshot.paramMap.get("courseUrl");

    this.course$ = this.coursesService.entities$
      .pipe(
        map(courses => courses.find(course => course.url == courseUrl))
      )

    this.lessons$ = this.leassonService.entities$
      .pipe(
        withLatestFrom(this.course$),
        tap(([leasons, course]) => {
          if (this.nextPage == 0) {
            this.loadLessonsPage(course)
          }
        }),
        map(([leasons, course]) => leasons.filter(leason => leason.courseId == course.id))
      );

    this.loading$ = this.leassonService.loading$.pipe(delay(0));
  }


  loadLessonsPage(course: Course) {
    this.leassonService.getWithQuery({
      'courseId': course.id.toString(),
      'pageNumber': this.nextPage.toString(),
      'pageSize': '3'
    });

    this.nextPage += 1
  }

}
