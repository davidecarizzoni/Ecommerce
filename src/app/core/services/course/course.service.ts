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
    return this.db.collection('courses', ref=> ref.orderBy("description"))
        .snapshotChanges()
        .pipe(
          map(snaps => convertSnaps<Course>(snaps)),
            first());
  }



  //=========================== METHOD TO UPLOAD INITIAL DATA======================================
  async  uploadData() {
    const courses = await this.db.collection('courses');
    for (let course of Object.values(COURSES)) {
      const newCourse = this.removeId(course);
      const courseRef = await courses.add(newCourse);
    }
  }

  removeId(data: any) {
    const newData: any = {...data};
    delete newData.id;
    return newData;
  }
}
