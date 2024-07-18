import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesEditarComponent } from './pacientes-editar.component';

describe('PacientesEditarComponent', () => {
  let component: PacientesEditarComponent;
  let fixture: ComponentFixture<PacientesEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacientesEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
