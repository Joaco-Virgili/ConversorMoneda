import { Injectable, inject } from '@angular/core';
import { Currency } from '../interfaces/currency';
import { API } from '../../../assets/api/api.connection';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService extends ApiService {

  
  async getAll():Promise<Currency[]>{
    const res = await this.getAuth("Currency")
    const resJson = await res.json();
    return resJson;
  };
  
  async getById(id:number | string):Promise<Currency | undefined>{
    const res = await this.getAuth("Currency/" + id);
    const resJson = await res.json();
    return resJson[0];
  };

}