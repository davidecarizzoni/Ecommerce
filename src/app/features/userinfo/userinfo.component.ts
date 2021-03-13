import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  getCurrentUser(){
    return this.authService.currentUser;
  }

  getCurrentUserID(){
    return this.authService.currentUserId;
  }

  getCurrentUserName(){
    return this.authService.currentUserName;
  }

  isLogged(): boolean {
    return this.authService.isUserEmailLoggedIn;
  }

  signout() {
    this.authService.signOut();
    this.router.navigateByUrl("/login");
  }
}
