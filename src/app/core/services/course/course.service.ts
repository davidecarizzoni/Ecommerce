import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from '../../model/product.interface';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Course } from '../../model/course.interface';
import { convertSnaps } from '../db-utils';
import { COURSES } from 'db-data';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private db: AngularFirestore) { }


  getAllCourses(): Observable<Course[]> {
    return this.db.collection('courses')
        .snapshotChanges()
        .pipe(
          map(snaps => convertSnaps<Course>(snaps)),
            first());
  }

  findCourseByUrl(url: string): Observable<Course> {
    return this.db.collection('courses/', ref=> ref.where("url", "==", url))
      .snapshotChanges()
      .pipe(
          map((snaps) => {
            let courses = convertSnaps<Course>(snaps)
            return courses[0];
          }),
          first()
        )
  }








}
