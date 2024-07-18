import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteInterface } from 'src/app/interfaces/paciente/paciente.interface';
import { PacientesService } from 'src/app/services/pacientes/pacientes.service';

@Component({
  selector: 'app-pacientes-cadastrar',
  templateUrl: './pacientes-cadastrar.component.html',
  styleUrls: ['./pacientes-cadastrar.component.scss']
})

export class PacientesCadastrarComponent implements OnInit {

  paciente: PacienteInterface = {
    nome: '',
    cpf: '',
    dataNascimento: '',
    cep: '',
    nivel_acesso: ''
  };
  formSubmitted: boolean = false;

  constructor(
    private pacienteService: PacientesService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  cadastrarPaciente(): void {
    this.formSubmitted = true;

    if (this.paciente.nome && this.paciente.cpf) {
      this.pacienteService.cadastrarPaciente(this.paciente)
        .subscribe(
          (res) => {
            console.log('Paciente cadastrado com sucesso:', res);
            this.paciente = {
              nome: '',
              cpf: '',
              email: '',
              dataNascimento: '',
              telefone: '',
              nivel_acesso: '',
              cep: ''
            };
            this.formSubmitted = false;
            this.router.navigate(['/pacientes-consultar'])
          },
          (err) => {
            console.error('Erro ao cadastrar paciente:', err);
          }
        );
    }
  }

  formatarCEP() {
    let cep = this.paciente.cep.replace(/\D/g, '');
    cep = cep.substring(0, 8);
    this.paciente.cep = cep;
  }

  buscarEnderecoPorCep() {
    if (this.paciente.cep.length === 8) {
      this.pacienteService.consultarCep(this.paciente.cep).subscribe(
        (endereco: any) => {
          this.paciente.endereco = endereco.logradouro;
          this.paciente.cidade = endereco.localidade;
          this.paciente.estado = endereco.uf;
        },
        error => {
          console.error('Erro ao buscar endereço por CEP:', error);
        }
      );
    }
  }

  voltar() {
    this.router.navigate(['/pacientes-consultar'])
  }

  formatarCPF(event: any) {
    const inputElement = event.target as HTMLInputElement;
    let cpf = inputElement.value.replace(/\D/g, '');
    cpf = cpf.substring(0, 11);

    if (cpf.length === 11) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    this.paciente.cpf = cpf;
  }
}
