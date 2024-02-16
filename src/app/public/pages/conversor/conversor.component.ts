import { Component, Input, inject, signal } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { Currency } from '../../interfaces/currency';
import { Conversion } from '../../interfaces/conversion';
import { ConversionService } from '../../services/converison.service';
import Swal from 'sweetalert2';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { UserSubs } from '../../interfaces/user';
import { Subscription } from '../../interfaces/subscription';
import { SubsService } from '../../services/subs.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.scss']
})
export class ConversorComponent {
  currencysService = inject(CurrencyService);
  conversionService = inject(ConversionService);
  subService = inject(SubsService);
  auth = inject(AuthService);
  currencys: Currency[] = [];
  isAdmin = signal(false);
  countConversion = signal(0);
  subUser = signal(0);

  subData: UserSubs = {
    subscriptionId: 0
  }


  @Input() subscription: Subscription = {
    id: 0,
    name: '',
    price: 0,
    amountOfConversion: 0
  }

  @Input() conversion: Conversion = {
    toCurrencyId: 0,
    fromCurrencyId: 0,
    amount: 0
  };


  ngOnInit(): void {
    this.currencysService.getAll().then(res => {
      this.currencys = res.sort((a, b) => a.name.localeCompare(b.name));
    });
    this.getUserSub();
    this.getRole();
    this.getCount();
  }



  async generateConversion() {

    if (this.conversion.toCurrencyId === this.conversion.fromCurrencyId) {
      console.log('Las monedas deben ser diferentes');
    }

    if (this.conversion.amount <= 0) {
      console.log('El monto debe ser mayor a 0');
    }

    const res = await this.conversionService.create(this.conversion);
    if (res !== undefined){
      Swal.fire({
        icon: "success",
        title: "Su conversión",
        text: "El total convertido es de: " + res
      });
    }else{
      Swal.fire({
        icon: "error",
        title: "Error al convertir",
        text: "Mejore su subscripcion para poder convertir mas monedas."
      });
    }

    const newCount = await this.conversionService.getCount();

    this.countConversion.set(newCount);
  }

  async getUserSub() {

    const token = await this.auth.token();
    if (token) {
      const decodeToken = jwtDecode<JwtPayload>(token);

      const getSubById = this.subService.getById(decodeToken.subId);
      getSubById.then(res => {
        if (res === undefined) {
          return undefined;
        }
        this.subUser.set(res.amountOfConversion);
      });
      this.subUser.set(0);
    }
  }

  getRole() {
    this.isAdmin.set(false);
    const token = localStorage.getItem('token')
    if (!token) {
      return undefined
    }
    const decodeToken = jwtDecode<JwtPayload>(token)
    const role = decodeToken.role
    if (role === "Admin") {
      this.isAdmin.set(true)
      console.log("ES ADMIN")
    } else {
      this.isAdmin.set(false);
      console.log("ES USER")
    }
  }

  async getCount() {
    const res = await this.conversionService.getCount();
    this.countConversion.set(res);
  }

  addCurrency(currency : Currency): void{
    this.currencys.push(currency);
  }
}
