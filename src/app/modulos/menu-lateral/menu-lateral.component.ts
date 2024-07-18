import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router, UrlTree } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {

  isOpen = false;
  isConfigOpen = false;
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  ngOnInit(): void {
    this.atualizarEstadoAutenticacao();
  }

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private elementRef: ElementRef,
    private http: HttpClient,
    private loginService: LoginService
  ) {
    this.isAdmin = this.usuarioService.verificarSeAdmin();
  }

  menuIcon = 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png';

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  toggleConfig() {
    this.isConfigOpen = !this.isConfigOpen;
  }

  onMouseEnter() {
    this.isConfigOpen = true;
  }

  onMouseLeave() {
    this.isConfigOpen = false;
  }

  atualizarEstadoAutenticacao(): void {
    this.isAuthenticated = this.usuarioService.verificarSeLogado();
  }

  toggleConfigMenu(): void {
    this.isConfigOpen = !this.isConfigOpen;
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin === 'true') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}





