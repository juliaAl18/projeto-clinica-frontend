import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Dentista } from 'src/app/interfaces/dentista/dentista.interface';
import { DentistaService } from 'src/app/services/dentista/dentista.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dentista-consultar',
  templateUrl: './dentista-consultar.component.html',
  styleUrls: ['./dentista-consultar.component.scss']
})

export class DentistaConsultarComponent implements OnInit {

  dataSource = new MatTableDataSource<Dentista>();
  dentistas: Dentista[] = [];
  displayedColumns: string[] = ['cpf', 'nome', 'especialidade', 'dataNascimento', 'email', 'telefone', 'endereco', 'cidade', 'estado', 'cep', 'acao'];
  formularioPesquisa: FormGroup;

  constructor(
    private dentistaService: DentistaService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: SnackBarService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.formularioPesquisa = this.fb.group({
      nome: ['']
    });
  }

  ngOnInit(): void {
    this.pesquisarDentistasPorNome('');
  }

  irParaCadastro() {
    this.router.navigate(['/dentistas-cadastrar'])
  }

  carregarDentistas(): void {
    this.dentistaService.getAllDentistas().subscribe(
      (data) => {
        console.log(data);
        this.dentistas = data;
      },
      (error) => {
        console.error('Erro ao carregar dentistas:', error);
      }
    );
  }

  pesquisarDentistasPorNome(nome: string): void {
    this.dentistaService.filtrarDentistasPorNome(nome).subscribe(
      (data) => {
        console.log(data);
        this.dentistas = data;
        console.log('Dentistas carregados:', this.dentistas);
        this.formularioPesquisa.reset();
      },
      (error) => {
        console.error('Erro ao pesquisar dentistas por nome:', error);
      }
    );
  }

  onSubmit(): void {
    const nome = this.formularioPesquisa.get('nome')?.value;
    this.pesquisarDentistasPorNome(nome);
  }

  toggleMenu(): void {
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    sidebar.classList.toggle('open');
  }

  formatarData(data: Date | null): string {
    if (data) {
      return this.datePipe.transform(data, 'dd/MM/yyyy') || '';
    }
    return '';
  }

  confirmarExclusao(id: number): void {
    if (confirm(`Tem certeza de que deseja excluir esse dentista?`))
      this.dentistaService.deletarDentista(id).subscribe(
        () => {
          this.snackBar.openSnackBar('Dentista deletado com sucesso!', 'Ok', 'success')
          this.dentistas = this.dentistas.filter(dentista => dentista.id !== id);
        },
        (error) => {
          this.snackBar.openSnackBar('Erro ao deletar dentista', 'Ok', 'error')
          console.error('Erro ao deletar o dentista:', error);
        }
      );
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

  irParaEditar(id: number): void {
    this.router.navigate(['/dentistas-editar', id]);
  }
}
