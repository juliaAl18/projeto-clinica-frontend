import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipamentoInterface } from 'src/app/interfaces/equipamentos/equipamentos.interface';
import { EquipamentosService } from 'src/app/services/equipamentos/equipamentos.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';

@Component({
  selector: 'app-equipamentos',
  templateUrl: './equipamentos.component.html',
  styleUrls: ['./equipamentos.component.scss']
})

export class EquipamentosComponent implements OnInit {

  formulario: FormGroup;
  dataSource = new MatTableDataSource<EquipamentoInterface>();
  equipamentos: EquipamentoInterface[] = [];
  displayedColumns: string[] = ['nome', 'tipo', 'marca', 'anoFabricacao', 'disponivel', 'acao'];
  formConsultaQuestao = this.formBuilder.group({
    nome: ['', Validators.required],
    tipo: ['', Validators.required],
    marca: [''],
    modelo: [''],
    ano_fabricacao: ['', Validators.pattern('^[0-9]*$')],
    disponivel: [true]
  });
  listEquipamentos: EquipamentoInterface[] = [];
  tamListaFiltrada!: number;

  constructor(
    private formBuilder: FormBuilder,
    private equipamentosService: EquipamentosService,
    private router: Router,
    private snackBar: SnackBarService
  ) {
    this.formulario = this.formBuilder.group({
      nome: ['']
    });

  }

  ngOnInit(): void {
    this.carregarEquipamentos();
  }

  carregarEquipamentos(): void {
    this.equipamentosService.getEquipamentos().subscribe(
      (equipamentos) => {
        this.dataSource.data = equipamentos;
      },
      (error) => {
        console.error('Erro ao carregar equipamentos após exclusão:', error);
      }
    );
  }

  filtro(): void {
    const nome = this.formulario.get('nome')?.value;
    this.equipamentosService.getEquipamentos(nome)
      .subscribe((equipamentos: EquipamentoInterface[]) => {
        this.equipamentos = equipamentos;
      });
  }

  abrirDialog(equipamento: EquipamentoInterface): void {
    console.log('Abrir dialog para:', equipamento);
  }

  confirmarExclusao(equipamentoId: number): void {
    if (confirm('Tem certeza de que deseja excluir este equipamento?')) {
      this.equipamentosService.excluirEquipamento(equipamentoId).subscribe(
        () => {
          this.snackBar.openSnackBar('Equipamento excluído com sucesso', 'Fechar', 'success');
          this.carregarEquipamentos();
        },
        (error) => {
          this.snackBar.openSnackBar('Erro ao excluir equipamento', 'Fechar', 'error');
        }
      );
    }
  }

  irParaCadastro(): void {
    this.router.navigate(['/equipamentos-cadastrar'])
  }

  irParaEditar(equipamentoId: number): void {
    this.router.navigate(['/equipamentos-editar', equipamentoId]);
  }

  toggleMenu(): void {
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    sidebar.classList.toggle('open');
  }
}



