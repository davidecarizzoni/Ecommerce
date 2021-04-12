import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/model/product.interface';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/core/services/product/product.service';
import { Course } from 'src/app/core/model/course.interface';
import { CourseService } from 'src/app/core/services/course/course.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CartService } from 'src/app/core/services/cart/cart.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  course: any;
  url!: any;
  user:any;

  constructor(private courseService: CourseService, private auth:AuthService, private cartService: CartService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.catchUrl();
    this.auth.getUserState().subscribe(user => this.user = user)
    this.courseService.findCourseByUrl(this.url).subscribe(course => this.course = course)
  }

  catchUrl(){
    this.route.paramMap.subscribe( params => this.url = String(params.get('url')))
  }

  addToCart(url: any){
    if(this.user == null){
      console.log("Nessun utenten loggato")
    }else{
      this.cartService.add(this.user.uid, url);
    }
  }

}
