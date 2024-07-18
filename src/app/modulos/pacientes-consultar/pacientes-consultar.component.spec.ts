import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesConsultarComponent } from './pacientes-consultar.component';

describe('PacientesConsultarComponent', () => {
  let component: PacientesConsultarComponent;
  let fixture: ComponentFixture<PacientesConsultarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacientesConsultarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientesConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
