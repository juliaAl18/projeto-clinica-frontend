import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements CanActivate {

  constructor(
    private usuarioService: UsuarioService, 
    private router: Router,

  ) { }

  canActivate(): boolean {
    if (this.usuarioService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
