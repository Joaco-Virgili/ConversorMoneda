import {
    Injectable,
    WritableSignal,
    inject,
    signal,
  } from '@angular/core';
  import { API } from '../../../assets/api/api.connection';
  import { LoginData, RegisterData } from '../interfaces/user';
  import { Router } from '@angular/router';
  import { jwtDecode } from 'jwt-decode';
  
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
    
    decodedToken(token:string ):any{
      try{
        const decoded=jwtDecode(token);
        return decoded;
      }catch(error){
        console.log('error al decodificar el token',error);
        return null;
      }
  };

  }
