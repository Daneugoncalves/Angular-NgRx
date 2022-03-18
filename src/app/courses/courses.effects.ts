import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { CoursesActions } from "./action-types";
import { allCoursesLoaded } from "./courses.actions";
import { CoursesHttpService } from "./services/courses-http.service";

@Injectable()
export class CoursesEffects {

    loadCourses$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(CoursesActions.loadAllCourses),
                concatMap(action => 
                    this.coursesHttpService.findAllCourses()),
                map(courses => allCoursesLoaded({courses}))
            )
    )

    constructor(private actions$: Actions, private coursesHttpService: CoursesHttpService) {

    }
}