import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesCadastrarComponent } from './pacientes-cadastrar.component';

describe('PacientesCadastrarComponent', () => {
  let component: PacientesCadastrarComponent;
  let fixture: ComponentFixture<PacientesCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacientesCadastrarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientesCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
