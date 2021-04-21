import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/model/product.interface';
import { finalize, map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { Observable } from 'rxjs';
import { Course } from 'src/app/core/model/course.interface';
import { CourseService } from 'src/app/core/services/course/course.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  courses!: Course[];
  coursesFiltered!: Course[];
  coursesCategoryRest!: Course[];
  coursesCategoryServerless!: Course[];
  cartLength:any;

  user: any;
  userUid: any;
  serverLess: boolean = false;
  restAngular: boolean = false;

  massimo: number = 1000;
  minimo: number = 0;

  beginner: any = false;
  intermediate: any = false;
  advanced: any = false;

  //COUNT: da implementare

  constructor(private coursesService: CourseService, private auth: AuthService, private cartService:CartService) {}

  ngOnInit(): void {
    this.userUid = localStorage.getItem("userUid");
    this.auth.getUserState().subscribe(user => this.user = user)
    this.cartService.findCartByUserUid(this.userUid).subscribe(cart => this.cartLength = cart.productList.length)
    this.coursesService.getAllCourses().subscribe(courses => this.courses = courses)
    this.coursesService.getCoursesByCategory('rest-angular').subscribe(courses => this.coursesCategoryRest = courses)
    this.coursesService.getCoursesByCategory('serverless-angular').subscribe(courses => this.coursesCategoryServerless = courses)
    this.coursesService.searchCourses('Core').subscribe(courses =>{
      this.coursesFiltered = courses
      console.log(this.coursesFiltered)
    })
  }

  addToCart(url: any){
    if(this.user == null){
      console.log("Nessun utenten loggato")
    }else{
      this.cartService.add(this.user.uid, url);
    }
  }

  setCategory(cat:string){

    if(cat=='rest') this.restAngular = !this.restAngular;
    if(cat=='serverless') this.serverLess = !this.serverLess;

    if((this.serverLess==true && this.restAngular==true) || (this.serverLess==false && this.restAngular==false))
      this.coursesService.getAllCourses().subscribe(courses => this.courses = courses)

    if(this.serverLess==true && this.restAngular==false)
      this.serverLess ? this.coursesService.getCoursesByCategory('serverless-angular').subscribe(courses => this.courses = courses) : this.coursesService.getAllCourses().subscribe(courses => this.courses = courses)

    if(this.serverLess==false && this.restAngular==true){
      this.restAngular ? this.coursesService.getCoursesByCategory('rest-angular').subscribe(courses => this.courses = courses) : this.coursesService.getAllCourses().subscribe(courses => this.courses = courses)
    }
  }

  setPrice(form:any){
   this.minimo = form.value.min;
   this.massimo = form.value.max;
  }

  searchCourse(form:any){
    if(form.value.search=="" || form.value.search==null)
      this.coursesService.getAllCourses().subscribe(courses => this.courses = courses);
    else
      this.coursesService.searchCourses(form.value.search).subscribe(courses => this.courses = courses)
  }

  setDifficult(dif:string){
    if(dif == 'beginner')      this.beginner = !this.beginner;
    if(dif == 'intermediate')  this.intermediate = !this.intermediate;
    if(dif == 'advanced')      this.advanced = !this.advanced;

    if(this.beginner && !this.intermediate && !this.advanced) this.coursesService.getCoursesByDifficult('BEGINNER').subscribe(courses => this.courses = courses)
    else if(!this.beginner && this.intermediate && !this.advanced) this.coursesService.getCoursesByDifficult('INTERMEDIATE').subscribe(courses => this.courses = courses)
    else if(!this.beginner && !this.intermediate && this.advanced) this.coursesService.getCoursesByDifficult('ADVANCED').subscribe(courses => this.courses = courses)
    else this.coursesService.getAllCourses().subscribe(courses => this.courses = courses)
  }

}


