import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Conversion } from '../../interfaces/conversion';
import { Currency } from '../../interfaces/currency';

@Component({
  selector: 'app-view-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.scss']
})
export class ViewResultComponent {

  @Input() currency:Currency = {
    id: 0,
    name: "",
    value: 0,
    symbol: "",

  }

  @Input() conversion:Conversion = {
    toCurrencyId: 0,
    fromCurrencyId: 0,
    amount: 0,
    result: 0
  }

}
