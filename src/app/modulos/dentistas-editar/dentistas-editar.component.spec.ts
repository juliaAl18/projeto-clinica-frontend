import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistasEditarComponent } from './dentistas-editar.component';

describe('DentistasEditarComponent', () => {
  let component: DentistasEditarComponent;
  let fixture: ComponentFixture<DentistasEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DentistasEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DentistasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
