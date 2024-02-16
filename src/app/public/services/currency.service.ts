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

  async create(currency:Currency):Promise<void>{
    const res = await fetch(API + 'Currency',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        Authorization: "Bearer "+ this.auth.token()
      },
      body: JSON.stringify(currency)
    })
    if (res.status === 401){
      return undefined;
    }
    return res.json();
  };

  async edit(currency: Currency): Promise<void> {
    if (!currency.id) {
      return undefined;
    }
    const res = await fetch(API + 'Currency/' + currency.id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.auth.token(),
      },
      body: JSON.stringify(currency),
    });
    return res.json();
  }

  async delete(id: number): Promise<boolean> {
    const res = await fetch(API + 'Currency/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + this.auth.token(),
      },
    });
    return res.ok;
  }
}