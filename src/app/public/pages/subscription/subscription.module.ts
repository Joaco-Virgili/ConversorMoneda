import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionComponent } from './subscription.component';
import { TarjetaSubsComponent } from '../../components/tarjeta-subs/tarjeta-subs.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SubscriptionComponent
  ],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    TarjetaSubsComponent,
    FormsModule
  ]
})
export class SubscriptionModule { }
