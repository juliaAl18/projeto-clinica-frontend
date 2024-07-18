import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgendarConsultaComponent } from './modulos/agendar-consulta/agendar-consulta.component';;
import { CompraComponent } from './modulos/compra/compra.component';
import { LoginComponent } from './modulos/login/login.component';
import { PaginaInicialHomeComponent } from './modulos/pagina-inicial-home/pagina-inical-home.component';
import { PlanosComponent } from './modulos/planos/planos.component';
import { CadastroComponent } from './modulos/cadastro/cadastro.component';
import { RouterModule } from '@angular/router'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MenuLateralComponent } from './modulos/menu-lateral/menu-lateral.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UsuarioService } from './services/usuario/usuario.service';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { EquipamentosCadastrarComponent } from './modulos/equipamentos-cadastrar/equipamentos-cadastrar.component'; 
import { EquipamentosComponent } from './modulos/equipamento-consultar/equipamentos.component';
import { EquipamentosEditarComponent } from './modulos/equipamentos-editar/equipamentos-editar.component';
import { EquipamentosService } from './services/equipamentos/equipamentos.service';
import { FaturamentoComponent } from './modulos/faturamento/faturamento.component';
import { ConveniosComponent } from './modulos/convenios/convenios.component';
import { PagamentoComponent } from './modulos/pagamento/pagamento.component';
import { ModalDentistaComponent } from './modulos/modal-dentista/modal-dentista.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalPacienteComponent } from './modulos/modal-paciente/modal-paciente.component';
import { DentistasCadastrarComponent } from './modulos/dentistas-cadastrar/dentistas-cadastrar.component';
import { DentistaConsultarComponent } from './modulos/dentista-consultar/dentista-consultar.component';
import { DentistasEditarComponent } from './modulos/dentistas-editar/dentistas-editar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PacientesCadastrarComponent } from './modulos/pacientes-cadastrar/pacientes-cadastrar.component';
import { PacientesConsultarComponent } from './modulos/pacientes-consultar/pacientes-consultar.component';
import { PacientesEditarComponent } from './modulos/pacientes-editar/pacientes-editar.component';
import { DatePipe } from '@angular/common';
import { AdminComponent } from './modulos/admin/admin.component';
import { MenuLateralAdminComponent } from './modulos/menu-lateral-admin/menu-lateral-admin.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ComentariosComponent } from './modulos/comentarios/comentarios.component';

@NgModule({
  declarations: [
    AppComponent,
    AgendarConsultaComponent,
    CadastroComponent,
    CompraComponent,
    LoginComponent,
    PaginaInicialHomeComponent,
    PlanosComponent,
    MenuLateralComponent,
    EquipamentosComponent,
    EquipamentosCadastrarComponent,
    EquipamentosEditarComponent,
    FaturamentoComponent,
    ConveniosComponent,
    PagamentoComponent,
    ModalDentistaComponent,
    ModalPacienteComponent,
    DentistasCadastrarComponent,
    DentistaConsultarComponent,
    DentistasEditarComponent,
    PacientesCadastrarComponent,
    PacientesConsultarComponent,
    PacientesEditarComponent,
    AdminComponent,
    MenuLateralAdminComponent,
    ComentariosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FontAwesomeModule,
    BrowserAnimationsModule, 
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatListModule,
    SlickCarouselModule,
  ],
  providers: [UsuarioService, EquipamentosService, DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  { provide: MAT_DATE_FORMATS, useValue: {
      parse: {
        dateInput: 'LL',
      },
      display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
      },
    }
  },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
