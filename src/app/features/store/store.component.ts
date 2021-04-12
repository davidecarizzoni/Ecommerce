import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/model/product.interface';
import { finalize, map } from 'rxjs/operators';
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

  courses!: Course[];
  user: any;

  constructor(private coursesService: CourseService, private auth: AuthService, private cartService:CartService) { }

  ngOnInit(): void {
    this.auth.getUserState().subscribe(user => this.user = user)
    this.coursesService.getAllCourses().subscribe(courses => this.courses = courses)
  }

  addToCart(url: any){
    if(this.user == null){
      console.log("Nessun utenten loggato")
    }else{
      this.cartService.add(this.user.uid, url);
    }
  }

}
