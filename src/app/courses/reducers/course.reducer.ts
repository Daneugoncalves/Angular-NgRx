import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CoursesActions } from "../action-types";
import { compareCourses, Course } from "../model/course";

export interface CourseState extends EntityState<Course> {
    // entities: {[key: number]: Course},
    // ids: number[];

    allCoursesLoaded: boolean
}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses
    // selectId: course => course.courseID => if have a custom identifier
});

export const initialCoursesState = adapter.getInitialState({
    allCoursesLoaded: false
});

export const coursesReducer = createReducer(
    initialCoursesState,

    on(CoursesActions.allCoursesLoaded,
    (state, action) => adapter.addAll(action.courses, {...state, allCoursesLoaded: true}))
)

export const {selectAll} = adapter.getSelectors();
