import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Conversion } from '../interfaces/conversion';
import { API } from 'src/assets/api/api.connection';

@Injectable({
  providedIn: 'root'
})
export class ConversionService extends ApiService {
    
    async create(conversion:Conversion):Promise<boolean>{
      if(conversion) return false;
      const res = await fetch(API + 'CurrencyConverison',{
        method:'POST',
        headers:{
          "Content-type":"application/json",
          Authorization: "Bearer "+this.auth.token()
        },
        body: JSON.stringify(conversion)
      })
      return res.ok;
    };

    async getCount():Promise<Conversion[]>{
      const res = await this.getAuth("CurrencyConverison/count")
      return res.json();
    };
}