import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from '../../interfaces/subscription';
import { UserSubs } from '../../interfaces/user';
import { SubsService } from '../../services/subs.service';
import Swal from 'sweetalert2'
import { JwtPayload, jwtDecode } from "jwt-decode";
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
  @Input({required: true}) subscription!:Subscription;
  auth = inject(AuthService);

  user = {
    subscriptionId: 0
  };
  

  ngOnInit(): void {
    const token = this.auth.token();
    if (token) {
      const decodeToken = jwtDecode<JwtPayload>(token);
      this.user.subscriptionId = decodeToken.subId ?? 0;
    }
  }

  

}
