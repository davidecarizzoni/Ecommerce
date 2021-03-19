import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  authError: any;

  //Implementare messaggio di errore con ToastService o piccola finestrella a scomparsa easy

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.authService.eventAuthError$.subscribe( data => {
      this.authError = data;
    })
  }

  createUser(form:any){
    this.authService.createUser(form.value);
  }

  async googleAuth(){
    await this.authService.googleAuth();
  }

  async facebooAuth(){
    await this.authService.facebookAuth();
  }

}
