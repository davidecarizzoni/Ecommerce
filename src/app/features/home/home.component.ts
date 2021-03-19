import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public user:any;

  constructor( private authService: AuthService, private router:Router){}

  ngOnInit() {
    this.authService.getUserState().subscribe((user:any) => {
      this.user = user;
    })
  }

  logout(){
    this.authService.logout();
  }

}
