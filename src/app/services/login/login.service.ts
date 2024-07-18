
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
   
  private apiUrl = 'http://localhost:3000/api/login';

  constructor(
    private http: HttpClient,
    private route: Router
  ) {}

  login(email: string, senha: string) {
    return this.http.post<any>(this.apiUrl, { email, senha });
  }
}
