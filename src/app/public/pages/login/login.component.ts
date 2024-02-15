import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginData } from '../../interfaces/user';
import { ConversionService } from '../../services/converison.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authService = inject(AuthService);
  conversionService = inject(ConversionService)
  router = inject(Router);
  errorLogin = signal(false);
  cargando = signal(false);

  loginData: LoginData= {
    email:"",
    password: ""
  }

  login(){
    this.errorLogin.set(false);
    this.cargando.set(true);
    this.authService.login(this.loginData).then(res => {
      if(res) this.router.navigate(["/conversor"]);
      else {
        this.errorLogin.set(true)
      };
      this.cargando.set(false);
    });
  }
}
