import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PacienteInterface } from 'src/app/interfaces/paciente/paciente.interface';
import { PacientesService } from 'src/app/services/pacientes/pacientes.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';

@Component({
  selector: 'app-pacientes-editar',
  templateUrl: './pacientes-editar.component.html',
  styleUrls: ['./pacientes-editar.component.scss']
})

export class PacientesEditarComponent implements OnInit {

  paciente!: PacienteInterface;
  pacienteId!: number;
  minhaSubscricao: Subscription;
  telefone: string = '';

  novoPaciente: PacienteInterface = {
    cpf: '',
    nome: '',
    email: '',
    telefone: '',
    nivel_acesso: '',
    cep: '',
    dataNascimento: ''
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pacienteService: PacientesService,
    private snackBar: SnackBarService,
  ) {
    this.minhaSubscricao = new Subscription();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.pacienteId = +idParam;
        this.carregarEquipamento(this.pacienteId);
      } else {
        console.error('ID do equipamento não encontrado na rota');
      }
    });
  }

  carregarEquipamento(id: number): void {
    this.minhaSubscricao = this.pacienteService.pacientePorId(id).subscribe(
      (data: PacienteInterface) => {
        this.paciente = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Erro ao carregar equipamento:', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.minhaSubscricao.unsubscribe();
  }

  salvarEdicao(): void {
    if (this.paciente !== null) {
      this.minhaSubscricao = this.pacienteService.editarPaciente(this.pacienteId, this.paciente).subscribe(
        (response: any) => {
          this.snackBar.openSnackBar(
            "Paciente atualizado com sucesso!",
            "Ok",
            "success"
          );
          this.router.navigate(['/pacientes-consultar'])
        },
        (error: HttpErrorResponse) => {
          this.snackBar.openSnackBar(
            "Erro ao atualizar Paciente.",
            "Ok",
            "error"
          );
        }
      );
    } else {
      this.snackBar.openSnackBar(
        "Paciente não carregado ou inválido",
        "Ok",
        "warning"
      );
    }
  }

  formatarTelefone() {
    let numeroLimpo = this.telefone.replace(/\D/g, '');

    if (numeroLimpo.length >= 2) {
      numeroLimpo = `(${numeroLimpo.substring(0, 2)})${numeroLimpo.substring(2)}`;
    }

    if (numeroLimpo.length > 11) {
      numeroLimpo = numeroLimpo.substring(0, 11);
    }
    this.telefone = numeroLimpo;
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

  formatarCPF(event: any) {
    const inputElement = event.target as HTMLInputElement;
    let cpf = inputElement.value.replace(/\D/g, '');
    cpf = cpf.substring(0, 11);

    if (cpf.length === 11) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    this.paciente.cpf = cpf;
  }

  voltar() {
    this.router.navigate(['/pacientes-consultar'])
  }

}



