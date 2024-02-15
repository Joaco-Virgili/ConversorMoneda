import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from '../../interfaces/subscription';
import { UserSubs } from '../../interfaces/user';
import { SubsService } from '../../services/subs.service';
import Swal from 'sweetalert2'
import { jwtDecode } from "jwt-decode";
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tarjeta-subs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-subs.component.html',
  styleUrls: ['./tarjeta-subs.component.scss']
})
export class TarjetaSubsComponent {
  @Input({required: true}) subscription!:Subscription
  subsService=inject(SubsService);
  userService=inject(UserService)
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  auth = inject(AuthService);

  user = {
    subscriptionId: 0
  };
  

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Decodificar el token
      const tokenData = this.parseJwt(token);

      // Extraer el nombre de usuario del token y asignarlo a la propiedad user.Username
      this.user.subscriptionId = tokenData.subId; 
    }
  }

  
  private parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64));
    return JSON.parse(jsonPayload);
  };
}
