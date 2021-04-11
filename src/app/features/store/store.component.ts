import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/model/product.interface';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { Observable } from 'rxjs';
import { Course } from 'src/app/core/model/course.interface';
import { CourseService } from 'src/app/core/services/course/course.service';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  courses$!: Observable<Course[]>;
  beginnersCourses$!: Observable<Course[]>;
  advancedCourses$!: Observable<Course[]>;


  constructor(private coursesService: CourseService, private auth: AuthService, private cart:CartService) { }

  ngOnInit(): void {
    this.courses$ = this.coursesService.getAllCourses();

  }

}
