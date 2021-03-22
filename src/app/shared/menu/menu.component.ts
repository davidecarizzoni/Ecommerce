import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input()
  version:any;

  public user:any;

  constructor( private authService: AuthService, private router:Router){}

  ngOnInit() {
   this.authService.getUserState().subscribe((user:any) => {
      this.user = user;
    })
  }

  isLogged(){
    return this.user ? true: false;
  }

  logout(){
    this.authService.logout();
  }

  login(){
    this.router.navigateByUrl('/login');
  }

  register(){
    this.router.navigateByUrl('/register');
  }

  store(){
    this.router.navigateByUrl('/home');
  }

}
