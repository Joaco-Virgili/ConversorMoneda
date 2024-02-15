import {
    Injectable,
    WritableSignal,
    inject,
    signal,
  } from '@angular/core';
  import { API } from '../../../assets/api/api.connection';
  import { LoginData, RegisterData, User } from '../interfaces/user';
  import { Router } from '@angular/router';
  import { JwtPayload, jwtDecode } from 'jwt-decode';
  import { ApiService } from './api.service';
import { ConversionService } from './converison.service';
import { ɵparseCookieValue } from '@angular/common';
  
  @Injectable({
    providedIn: 'root',
  })
  export class AuthService {

    constructor() {
      this.token.set(localStorage.getItem('token'));
    }
    router = inject(Router);
    token: WritableSignal<string | null> = signal(null);
  
    async login(loginData: LoginData) {
      try {
        const res = await fetch(API + 'Authentication/authenticate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });
        if (!res.ok) return false;
        const tokenRecibido = await res.text();
        console.log('LOGUEANDO', tokenRecibido);
        localStorage.setItem('token', tokenRecibido);
        this.token.set(tokenRecibido);
        return true;
      } catch {
        return false;
      }
    }
  
    async register(registerData: RegisterData) {
      const res = await fetch(API + 'User', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });
      console.log('REGISTRANDO', res);
      return res;
    }
  
    logOut() {
      this.token.set(null);
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      console.log('SALIENDO');
    }
  }
