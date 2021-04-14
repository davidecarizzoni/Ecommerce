import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/core/services/product/product.service';
import { Product } from 'src/app/core/model/product.interface';
import { CourseService } from 'src/app/core/services/course/course.service';
import { Course } from 'src/app/core/model/course.interface';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart:any;
  courses:any;
  userUid: any;
  totCost: number = 0;
  cartCourses: any = [];

  constructor(private cartService: CartService, private courseService: CourseService, private auth:AuthService) { }

  ngOnInit(): void {
    this.totCost = 0;
    this.userUid = localStorage.getItem("userUid");
    this.courseService.getAllCourses().subscribe(courses => this.courses = courses)
    this.getCart();
  }

  getCart(){
    this.cartService.findCartByUserUid(this.userUid).subscribe(cart => {
      this.cart = cart;
      this.cart.productList.forEach((element:any) => {
          this.courses.forEach((element1:any) => {
            if(element == element1.url){
              this.cartCourses.push(element1);
              this.totCost+= element1.price;
            }
          });
      });
    })
  }

  removeToCart(courseUrl:string){
    this.cartService.remove(this.userUid, courseUrl).then(()=>this.getCart())
  }

}
