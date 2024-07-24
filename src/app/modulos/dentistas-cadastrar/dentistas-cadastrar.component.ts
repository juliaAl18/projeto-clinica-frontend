import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Dentista } from 'src/app/interfaces/dentista/dentista.interface';
import { DentistaService } from 'src/app/services/dentista/dentista.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';

@Component({
  selector: 'app-dentistas-cadastrar',
  templateUrl: './dentistas-cadastrar.component.html',
  styleUrls: ['./dentistas-cadastrar.component.scss']
})

export class DentistasCadastrarComponent implements OnInit {

  telefone: string = '';
  cpfJaCadastrado: boolean = false;

  dentista: Dentista = {
    nome: '',
    cpf: '',
    especialidade: '',
    email: '',
    dataNascimento: '',
    telefone: '',
    nivel_acesso: '',
    cep: ''
  };

  constructor(
    private dentistaService: DentistaService,
    private el: ElementRef,
    private renderer: Renderer2,
    private snackBar: SnackBarService,
    private router: Router,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void { }

  cadastrarDentista(): void {
    this.dentistaService.cadastrarDentista(this.dentista).subscribe(
      (response) => {
        this.snackBar.openSnackBar('Dentista cadastrado com sucesso!', 'Ok', 'success'),
          this.router.navigate(['/dentistas-consultar'])
        this.dentista = {
          nome: '',
          cpf: '',
          especialidade: '',
          email: '',
          dataNascimento: '',
          telefone: '',
          nivel_acesso: '',
          cep: ''
        };
      },
      (error) => {
        this.snackBar.openSnackBar('Erro ao cadastrar dentista', 'Ok', 'error')
        console.error('Erro ao cadastrar dentista:', error);
      }
    );
  }

  formatarCPF(event: any) {
    const inputElement = event.target as HTMLInputElement;
    let cpf = inputElement.value.replace(/\D/g, '');
    cpf = cpf.substring(0, 11);

    if (cpf.length === 11) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    this.dentista.cpf = cpf;
  }

  formatarCEP() {
    let cep = this.dentista.cep.replace(/\D/g, '');
    cep = cep.substring(0, 8);
    this.dentista.cep = cep;
  }

  buscarEnderecoPorCep() {
    if (this.dentista.cep.length === 8) {
      this.dentistaService.consultarCep(this.dentista.cep).subscribe(
        (endereco: any) => {
          this.dentista.endereco = endereco.logradouro;
          this.dentista.cidade = endereco.localidade;
          this.dentista.estado = endereco.uf;
        },
        error => {
          console.error('Erro ao buscar endereço por CEP:', error);
        }
      );
    }
  }

  voltar() {
    this.router.navigate(['dentistas-consultar'])
  }

}
