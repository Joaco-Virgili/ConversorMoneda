import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConversorRoutingModule } from './conversor-routing.module';
import { ConversorComponent } from './conversor.component';
import { FormsModule } from '@angular/forms';
import { ViewResultComponent } from "../../components/view-result/view-result.component";


@NgModule({
    declarations: [
        ConversorComponent
    ],
    imports: [
        CommonModule,
        ConversorRoutingModule,
        FormsModule,
        ViewResultComponent
    ]
})
export class ConversorModule { }
