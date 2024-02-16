import { Injectable, inject } from '@angular/core';
import { Currency } from '../interfaces/currency';
import { API } from '../../../assets/api/api.connection';
import { ApiService } from './api.service';
import { Subscription } from '../interfaces/subscription';
import { User } from '../interfaces/user';
import { JwtPayload, jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class SubsService extends ApiService {
  async getAll():Promise<Subscription[]>{
    const res = await this.getAuth("Subscription")
    const resJson = await res.json();
    return resJson;
  };

  async getById(id: number | string): Promise<Subscription | undefined> {
    const res = await fetch(API + 'Subscription/' + id, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.auth.token(),
      },
    });
    return await res.json();
  }
}