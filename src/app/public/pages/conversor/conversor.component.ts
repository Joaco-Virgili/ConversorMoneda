import { Component, Input, inject } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { Currency } from '../../interfaces/currency';
import { Conversion } from '../../interfaces/conversion';
import { ConversionService } from '../../services/converison.service';
import { SubsService } from '../../services/subs.service';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.scss']
})
export class ConversorComponent {
  currencysService = inject(CurrencyService);
  conversionService = inject(ConversionService);
  subsService = inject(SubsService);
  currencys:Currency[] = []
  
  @Input() conversion:Conversion = {
    toCurrencyId: 0,
    fromCurrencyId: 0,
    amount: 0
  }

  async generateConversion(){
    try{
      
      if(this.conversion.toCurrencyId === this.conversion.fromCurrencyId) {
      console.log('Las monedas deben ser diferentes')
      return;
    }

      if(this.conversion.toCurrencyId === 0 || this.conversion.fromCurrencyId === 0) {
        console.log('Debes seleccionar las monedas')
        return;
      }

      if(this.conversion.amount <= 0) {
        console.log('El monto debe ser mayor a 0')
        return;
      }
      const res = await this.conversionService.create(this.conversion);
      if(res) {
        console.log('Conversion registrada')
      }
      
    } catch(err) {
      console.warn('Error registrando', err)
    }
  }

  ngOnInit(): void {
    this.currencysService.getAll().then(res => {
      this.currencys = res.sort((a, b) => a.name.localeCompare(b.name));
    })
  }

}
