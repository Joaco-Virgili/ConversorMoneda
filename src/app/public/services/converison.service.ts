import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { ApiService } from './api.service';
import { Conversion } from '../interfaces/conversion';
import { API } from 'src/assets/api/api.connection';
import { User } from '../interfaces/user';
import { JwtPayload, jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ConversionService extends ApiService {
    

  token: WritableSignal<string | null> = signal(null);

  
    async create(conversion:Conversion):Promise<void>{
      const res = await fetch(API + 'CurrencyConverison',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          Authorization: "Bearer "+ this.auth.token()
        },
        body: JSON.stringify(conversion)
      });
      if (res.status === 401){
        return undefined;
      }
      return res.json();
    };

    async getCount():Promise<number>{
      const res = await this.getAuth("CurrencyConverison/count")
      return res.json();
    };

    async getToken(): Promise<string | null> {
      const token = localStorage.getItem('token');
      if (token === null){
        return null
      }
      return token
    }

    
}