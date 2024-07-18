import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SnackBarService } from '../snackBar/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  private isAuthenticated: boolean = false;
  private userRole: string = ''; 
  private baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
  ) {}
  cadastrarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuario`, usuario);
  }

  login(email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, senha });
  }

  isAdmin(): boolean {
    return true; 
  }

  verificarSeLogado(): boolean {
    return this.isAuthenticated;
  }

  verificarSeAdmin(): boolean {
    return this.userRole === 'admin';
  }
}


