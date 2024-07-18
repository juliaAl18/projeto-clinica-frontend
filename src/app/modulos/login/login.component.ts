import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {

  estaLogado: boolean = false;
  email: string = '';
  senha: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private usuario: UsuarioService,
    private snackBar: SnackBarService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void { }

  login() {
    if (!this.email || !this.senha) {
      this.snackBar.openSnackBar(
        "Por favor, preencha todos os campos.",
        "Ok",
        "warning"
      );
      return;
    }

    this.loginService.login(this.email, this.senha).subscribe(
      (res) => {
        if (res.isAdmin) {
          this.router.navigate(['/admin']);
          this.snackBar.openSnackBar('Login bem sucedido como admin!', 'Fechar', 'success');
        } else {
          this.snackBar.openSnackBar('Login bem sucedido!', 'Fechar', 'success');
          this.router.navigate(['/pagina-inicial-home']);
          
        }
      },
      (err) => {
      }
    );
  }
}
