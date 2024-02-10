import { Injectable, inject } from '@angular/core';
import { Currency } from '../interfaces/currency';
import { API } from '../../../assets/api/api.connection';
import { ApiService } from './api.service';
import { Subscription } from '../interfaces/subscription';
import { User } from '../interfaces/user';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class SubsService extends ApiService {
  async getAll():Promise<Subscription[]>{
    const res = await this.getAuth("Subscription")
    const resJson = await res.json();
    return resJson;
  };

  async getUserSubs(id:number | string):Promise<User>{
    const res = await this.getAuth("User/"+id)
    const resJson = await res.json();
    return resJson;
  };
  
}