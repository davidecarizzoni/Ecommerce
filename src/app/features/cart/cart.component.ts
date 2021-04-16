import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { CourseService } from 'src/app/core/services/course/course.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  cart:any;
  handler:any;
  courses:any;
  userUid: any;
  totCost: number = 0;
  tot:number = 0;
  cartCourses: any = [];

  constructor(private cartService: CartService, private courseService: CourseService, private auth:AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadStripe();
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

  pay(amount: any) {

    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51Ig9tZC3y5CwMUxMXDQbwOIAS3Wf9Q6qbra2jgZ2OV0mOfQaccsuaRdmevYVlZJLrny7U7d4en31mroc1PP3F5ij00oXfLqsuo',
      locale: 'auto',
      token: function (token: any) {
        console.log(token)
        alert('Thanks for your purchases');
      }
    });

    handler.open({
      name: 'Epay',
      description: 'Epay description',
      amount: amount * 100
    });
  }

  loadStripe() {

    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
          locale: 'auto',
          token: function (token: any) {
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
       window.document.body.appendChild(s);
    }
  }



  title = 'Epay';

  paymentRequest: google.payments.api.PaymentDataRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId'
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant'
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: (String)(this.tot),
      currencyCode: 'EUR',
      countryCode: 'BE'
    },
    callbackIntents: ['PAYMENT_AUTHORIZATION']
  };

  onLoadPaymentData = (
    event: Event
  ): void => {
    const eventDetail = event as CustomEvent<google.payments.api.PaymentData>;
    console.log('load payment data', eventDetail.detail);
  }

  onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (
    paymentData
    ) => {
      console.log('payment authorized', paymentData);
      return {
        transactionState: 'SUCCESS'
      };
    }

  onError = (event: ErrorEvent): void => {
    console.error('error', event.error);
  }



}
