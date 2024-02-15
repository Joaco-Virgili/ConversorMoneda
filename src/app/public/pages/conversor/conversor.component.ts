import { Component, Input, inject, signal } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { Currency } from '../../interfaces/currency';
import { Conversion } from '../../interfaces/conversion';
import { ConversionService } from '../../services/converison.service';
import Swal from 'sweetalert2';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { UserSubs } from '../../interfaces/user';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.scss']
})
export class ConversorComponent {
  currencysService = inject(CurrencyService);
  conversionService = inject(ConversionService);
  currencys:Currency[] = [];
  isAdmin = signal(false);
  countConversion = signal(false);

  subData:UserSubs = {
    subscriptionId: 0
  }

  @Input() conversion:Conversion = {
    toCurrencyId: 0,
    fromCurrencyId: 0,
    amount: 0
  };

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
        Swal.fire({
          icon:"success",
          title: "Su conversión",
          text: "El total convertido es de: " + res
        });
    } catch(err) {
      console.warn('Error registrando', err)
    }
  }

  ngOnInit(): void {
    this.currencysService.getAll().then(res => {
      this.currencys = res.sort((a, b) => a.name.localeCompare(b.name));
    });
    this.getRole();
  }

  getRole() {
    this.isAdmin.set(false);
    const token = localStorage.getItem('token')
    if(!token){
      return undefined  
    }
    const decodeToken = jwtDecode<JwtPayload>(token)
    const role = decodeToken.role
    if(role == "Admin"){
      this.isAdmin.set(true)
      console.log("ES ADMIN")
    }else{
      this.isAdmin.set(false);
      console.log("ES USER")
    }
  }

  // getCount(){
  //   this.countConversion.set(false);
  //   const count = this.conversionService.getCount();
  //   if(count ==)
  // }
}
