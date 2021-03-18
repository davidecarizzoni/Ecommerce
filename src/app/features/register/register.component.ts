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
  errorMessage = "";
  error: {name: string, message: string} = {name: '', message: ''}; //implementare la traduzione del messaggio in Italiano

  //Implementare messaggio di errore con ToastService o piccola finestrella a scomparsa easy

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.authService.eventAuthError$.subscribe( data => {
      this.authError = data;
    })
  }

  createUser(form:any){
    console.log("ola");
    console.log(form);
    this.authService.createUser(form.value);
  }



}
