import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterData } from '../../interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  authService = inject(AuthService)
  router = inject(Router);

  registerData: RegisterData = {
    email: "",
    password: "",
    name: "",
    lastName: ""
  }

  async register(){
    try{
      const res = await this.authService.register(this.registerData);
      if(res.ok) {
        this.router.navigate(["/login"])
      }
      
    } catch(err) {
      console.warn('Error registrando', err)
    }
  }
}
