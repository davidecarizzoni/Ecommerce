import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Course } from '../../model/course.interface';
import { convertSnaps } from '../db-utils';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  coursesRef!: AngularFirestoreCollection<Course>;


  constructor(private db: AngularFirestore) {
    this.coursesRef = this.db.collection('courses');

  }


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

  getCoursesByCategory(category: string):  Observable<Course[]> {
    return this.db.collection('courses/', ref => ref.where('categories', 'array-contains', category))
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<Course>(snaps)),
          first());
  }

  getCoursesByDifficult(difficult: string):  Observable<Course[]> {
    return this.db.collection('courses/', ref => ref.where('difficult', 'array-contains', difficult))
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<Course>(snaps)),
          first());
  }

  searchCourses(search:string):  Observable<Course[]> {
    return this.db.collection('courses/', ref => ref.where('titles.description', "array-contains", search))
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<Course>(snaps)),
          first());
  }
}

