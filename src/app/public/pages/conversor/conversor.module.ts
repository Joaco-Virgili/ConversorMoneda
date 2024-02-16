import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConversorRoutingModule } from './conversor-routing.module';
import { ConversorComponent } from './conversor.component';
import { FormsModule } from '@angular/forms';
import { NewCurrencyComponent } from "../../components/new-currency/new-currency.component";
import { EditCurrencyComponent } from "../../components/edit-currency/edit-currency.component";
import { DeleteCurrencyComponent } from "../../components/delete-currency/delete-currency.component";


@NgModule({
    declarations: [
        ConversorComponent
    ],
    imports: [
        CommonModule,
        ConversorRoutingModule,
        FormsModule,
        NewCurrencyComponent,
        EditCurrencyComponent,
        DeleteCurrencyComponent
    ]
})
export class ConversorModule { }
