import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modulos/login/login.component';
import { AgendarConsultaComponent } from './modulos/agendar-consulta/agendar-consulta.component';
import { PlanosComponent } from './modulos/planos/planos.component';
import { CompraComponent } from './modulos/compra/compra.component';
import { CadastroComponent } from './modulos/cadastro/cadastro.component';
import { PaginaInicialHomeComponent } from './modulos/pagina-inicial-home/pagina-inical-home.component';
import { MenuLateralComponent } from './modulos/menu-lateral/menu-lateral.component';
import { EquipamentosCadastrarComponent } from './modulos/equipamentos-cadastrar/equipamentos-cadastrar.component';
import { EquipamentosComponent } from './modulos/equipamento-consultar/equipamentos.component';
import { EquipamentosEditarComponent } from './modulos/equipamentos-editar/equipamentos-editar.component';
import { FaturamentoComponent } from './modulos/faturamento/faturamento.component';
import { ConveniosComponent } from './modulos/convenios/convenios.component';
import { PagamentoComponent } from './modulos/pagamento/pagamento.component';
import { ModalDentistaComponent } from './modulos/modal-dentista/modal-dentista.component';
import { ModalPacienteComponent } from './modulos/modal-paciente/modal-paciente.component';
import { DentistasCadastrarComponent } from './modulos/dentistas-cadastrar/dentistas-cadastrar.component';
import { DentistaConsultarComponent } from './modulos/dentista-consultar/dentista-consultar.component';
import { DentistasEditarComponent } from './modulos/dentistas-editar/dentistas-editar.component';
import { PacientesCadastrarComponent } from './modulos/pacientes-cadastrar/pacientes-cadastrar.component';
import { PacientesConsultarComponent } from './modulos/pacientes-consultar/pacientes-consultar.component';
import { PacientesEditarComponent } from './modulos/pacientes-editar/pacientes-editar.component';
import { AdminComponent } from './modulos/admin/admin.component';
import { AdminService } from './services/admin/admin.service';
import { ComentariosComponent } from './modulos/comentarios/comentarios.component';

const routes: Routes = [
  { path: 'pagina-inicial-home', component: PaginaInicialHomeComponent },
  { path: '', pathMatch: "full", redirectTo: 'pagina-inicial-home' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminService] 
  },
  { path: 'agendar', component: AgendarConsultaComponent },
  { path: 'planos', component: PlanosComponent },
  { path: 'compra', component: CompraComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'menu-lateral', component: MenuLateralComponent },
  { path: 'equipamentos', component: EquipamentosComponent },
  { path: 'equipamentos-cadastrar', component: EquipamentosCadastrarComponent },
  { path: 'equipamentos-editar/:id', component: EquipamentosEditarComponent },
  { path: 'faturamento', component: FaturamentoComponent },
  { path: 'convenios', component: ConveniosComponent },
  { path: 'pagamento', component: PagamentoComponent },
  { path: 'modal-dentista', component: ModalDentistaComponent },
  { path: 'modal-paciente', component: ModalPacienteComponent },
  { path: 'dentistas-cadastrar', component: DentistasCadastrarComponent },
  { path: 'dentistas-consultar', component: DentistaConsultarComponent },
  { path: 'dentistas-editar/:id', component: DentistasEditarComponent },
  { path: 'pacientes-cadastrar', component: PacientesCadastrarComponent },
  { path: 'pacientes-consultar', component: PacientesConsultarComponent },
  { path: 'pacientes-editar/:id', component: PacientesEditarComponent },
  { path: 'enviar-promocao', component: PacientesConsultarComponent },
  { path: 'comentarios', component: ComentariosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
