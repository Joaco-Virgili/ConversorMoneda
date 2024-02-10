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
    subscriptionId: 1 
  }

  user = {
    subscriptionId: 0
  };

  @Input() subscription = {
    id: 0,
    name: '',
    price: 0,
    amountOfConverion: 0
  }

  ngOnInit(): void {
    this.subsService.getAll().then(res => {
      this.subscriptions = res;
    })
  }
  changeSub(id:number){
    this.userService.edit(this.user).then(res => {
      Swal.fire({
        title: "¿Estas seguro que desas cambiar de subscripción?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
      this.router.navigate(['/subscription']);
    }) 
  }
}
