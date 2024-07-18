
import { Component, OnInit } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})

export class CadastroComponent implements OnInit {

  nome: string = '';
  email: string = '';
  senha: string = '';
  nivel_acesso: string = 'usuario'
  confirmarSenha: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private http: HttpClient,
    private router: Router,
    private snackBar: SnackBarService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  cadastrarUsuario(): void {

    if (this.senha !== this.confirmarSenha) {
      this.snackBar.openSnackBar(
        "As senhas digitadas não coincidem.",
        "Ok",
        "warning"
      );
      return;
    }

    const usuario = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      nivel_acesso: 'usuario',
    };

    const url = 'http://localhost:3000/api/usuario';

    this.http.post(url, usuario, { responseType: 'text' }).subscribe(
      (response: any) => {
        console.log(response);

        if (response.includes('Usuário cadastrado com sucesso')) {
          this.snackBar.openSnackBar(
            "Usuário Cadastrado com sucesso!",
            "Ok",
            "success"
          );
          this.router.navigate(['/login']);
        } else {
          console.error(response);
          this.snackBar.openSnackBar(
            "Erro ao cadastrar usuário. Por favor, tente novamente.",
            "Ok",
            "warning"
          );
        }
      },
      (error) => {
        console.error(error);

        if (error.status === 0) {
          this.snackBar.openSnackBar(
            "Não foi possível conectar ao servidor. Por favor, verifique sua conexão com a internet.",
            "Ok",
            "error"
          );
        } else if (error.status === 400) {
          console.log(error.error);
          if (error.error === 'A senha deve ter pelo menos 8 caracteres') {
            this.snackBar.openSnackBar(
              error.error,
              "Ok",
              "warning"
            );
          } else if (error.error === 'Este e-mail já está em uso') {
            this.snackBar.openSnackBar(
              error.error,
              "Ok",
              "warning"
            );
          } else {
            this.snackBar.openSnackBar(
              "Erro ao cadastrar usuário. Por favor, tente novamente.",
              "Ok",
              "warning"
            );
          }
        } else {
          this.snackBar.openSnackBar(
            "Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.",
            "Ok",
            "error"
          );
        }
      }
    );
  }

  voltar() {
    window.history.back();
  }

}

