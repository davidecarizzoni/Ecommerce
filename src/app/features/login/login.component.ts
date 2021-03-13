import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage = "";
  error: {name: string, message: string} = {name: '', message: ''}; //implementare la traduzione del messaggio in Italiano

  //Implementare messaggio di errore con ToastService o piccola finestrella a scomparsa easy

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  clearErrorMessage() {
    this.errorMessage = "";
    this.error = {name: '', message: ''};
  }

  login(form: any){
    this.clearErrorMessage();
    if(this.validateInput(form)){
      this.authService.loginWithEmail(form.email, form.password).then(() => {
        this.router.navigate(['/userinfo'])
      }).catch((_error: any) => {
          this.error = _error
          this.router.navigate(['/login'])
      })
    }
  }

  validateInput(form:any){
    if(form.email.length === 0 ){
      this.errorMessage = "Email non valida. Reinserire";
      return false;
    }

    if(form.password.length === 0 ){
      this.errorMessage = "Password non valida. Reinserire";
      return false;
    }

    if(form.password.length < 6) {
      this.errorMessage = "Passord troppo corta. Lunghezza minima di 6 caratteri";
      return false;
    }

    this.errorMessage = "";
    return true;
  }
}
