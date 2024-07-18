import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu-lateral-admin',
  templateUrl: './menu-lateral-admin.component.html',
  styleUrls: ['./menu-lateral-admin.component.scss']
})

export class MenuLateralAdminComponent implements OnInit {

  isOpen = false;
  isConfigOpen = false;
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  ngOnInit(): void {
  }

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private http: HttpClient
  ) { }


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

  toggleConfigMenu(): void {
    this.isConfigOpen = !this.isConfigOpen;
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');

    if (token && isAdmin === 'true') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
