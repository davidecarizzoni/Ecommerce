


import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from 'rxjs';
import {first} from 'rxjs/operators';
import { Course } from "../../model/course.interface";
import { CourseService } from "./course.service";



@Injectable({
  providedIn: 'root'
})
export class CourseResolver implements Resolve<Course> {

    courseUrl!: string;

    constructor(private coursesService:CourseService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Course> {
        this.courseUrl = (String)(route.paramMap.get('courseUrl'));
        return this.coursesService.findCourseByUrl(this.courseUrl);
    }

}

