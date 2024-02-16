import { Component, Input, inject } from '@angular/core';
import { SubsService } from '../../services/subs.service';
import { Subscription } from '../../interfaces/subscription';
import { UserSubs } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent {
  subsService= inject(SubsService);
  userService= inject(UserService);
  router = inject(Router);
  subscriptions:Subscription[] = []

  subData:UserSubs = {
    subscriptionId: 0
  }


  @Input() subscription: Subscription = {
    id: 0,
    name: '',
    price: 0,
    amountOfConversion: 0
  };

  ngOnInit(): void {
    this.subsService.getAll().then(res => {
      this.subscriptions = res;
    });
  }

  changeSub(Id: number): void {
    const newSubscription: UserSubs = {
      subscriptionId: Id
    };

    Swal.fire({
      title: "¿Estás seguro que deseas cambiar de suscripción?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cambiar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.edit(newSubscription).then(res => {
          if (!res) {
            Swal.fire({
              title: "Error",
              text: "No se ha podido cambiar de suscripción",
              icon: "error"
            });
          } else {
            Swal.fire({
              title: "Cambiado",
              text: "Su suscripción ha sido cambiada con éxito",
              icon: "success"
            });
            this.subData.subscriptionId = Id;
          }
        }).catch(err => {
          console.error("Error al cambiar de suscripción:", err);
        });
      }
    });
  }
}
