import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authError: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.eventAuthError$.subscribe( data => {
      this.authError = data;
    })
  }

  login(form:any) {
    this.authService.loginWithEmail(form.value.email, form.value.password);
  }

  async googleAuth(){
    await this.authService.googleAuth();
  }

  async facebookAuth(){
    await this.authService.facebookAuth();
  }

}
