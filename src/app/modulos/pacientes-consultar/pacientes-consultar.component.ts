import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PacienteInterface } from 'src/app/interfaces/paciente/paciente.interface';
import { PacientesService } from 'src/app/services/pacientes/pacientes.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';

@Component({
  selector: 'app-pacientes-consultar',
  templateUrl: './pacientes-consultar.component.html',
  styleUrls: ['./pacientes-consultar.component.scss']
})

export class PacientesConsultarComponent implements OnInit {

  dataSource = new MatTableDataSource<PacienteInterface>();
  pacientes: PacienteInterface[] = [];
  displayedColumns: string[] = ['cpf', 'nome', 'genero', 'dataNascimento', 'email', 'telefone', 'endereco', 'cidade', 'estado', 'cep', 'acao'];
  formularioPesquisa: FormGroup;
  mensagem: string = '';
  errorMessage: string = '';

  constructor(
    private pacienteService: PacientesService,
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    private snackBar: SnackBarService
  ) {
    this.formularioPesquisa = this.fb.group({
      nome: ['']
    });
  }

  ngOnInit(): void {
    this.pesquisarPacientes('');
  }

  carregarPacientes(): void {
    this.pacienteService.buscarPacientes().subscribe(
      (data) => {
        console.log(data);
        this.pacientes = data;
        this.atualizarTabela();
      },
      (error) => {
        console.error('Erro ao carregar pacientes:', error);
      }
    );
  }

  formatarData(data: Date | null): string {
    if (data) {
      return this.datePipe.transform(data, 'dd/MM/yyyy') || '';
    }
    return '';
  }

  pesquisarPacientes(nome: string): void {
    this.pacienteService.pesquisarPacientes(nome).subscribe(
      (data) => {
        console.log(data);
        this.pacientes = data;
        this.atualizarTabela();
        this.formularioPesquisa.reset();
      },
      (error) => {
        console.error('Erro ao pesquisar pacientes por nome:', error);
      }
    );
  }

  atualizarTabela(): void {
    this.dataSource.data = this.pacientes;
  }

  onSubmit(): void {
    const nome = this.formularioPesquisa.get('nome')?.value;
    this.pesquisarPacientes(nome);
  }

  formatarTelefone(telefone: string): string {
    let numeroLimpo = telefone.replace(/\D/g, '');

    if (numeroLimpo.length > 11) {
      numeroLimpo = numeroLimpo.substring(0, 11);
    }

    if (numeroLimpo.length === 11) {
      numeroLimpo = `(${numeroLimpo.substring(0, 2)}) ${numeroLimpo.substring(2, 7)}-${numeroLimpo.substring(7)}`;
    }
    return numeroLimpo;
  }

  toggleMenu(): void {
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    sidebar.classList.toggle('open');
  }

  irParaCadastro() {
    this.router.navigate(['/pacientes-cadastrar'])
  }

  irParaEditar(id: number): void {
    this.router.navigate(['/pacientes-editar', id]);
  }

  confirmarExclusao(id: number): void {
    if (confirm(`Tem certeza de que deseja excluir este paciente?`)) {
      this.pacienteService.deletarPaciente(id).subscribe(
        () => {
          this.snackBar.openSnackBar('Paciente deletado com sucesso!', 'Fechar', 'success');
          this.pacientes = this.pacientes.filter(paciente => paciente.id !== id);
          this.atualizarTabela();
        },
        (error) => {
          this.snackBar.openSnackBar('Erro ao deletar paciente', 'Ok', 'error');
        }
      );
    }
  }

  enviarPromocao(): void {
    this.pacienteService.enviarPromocao().subscribe(
      () => {
        this.snackBar.openSnackBar('Emails enviados com sucesso!', 'Ok', 'success')
        this.errorMessage = ''; 
      },
      error => {
        this.snackBar.openSnackBar('Erro ao enviar E-mails.', 'Ok', 'error')
      }
    );
  }
}
