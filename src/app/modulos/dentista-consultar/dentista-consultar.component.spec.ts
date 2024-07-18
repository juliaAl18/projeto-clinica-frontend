import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistaConsultarComponent } from './dentista-consultar.component';

describe('DentistaConsultarComponent', () => {
  let component: DentistaConsultarComponent;
  let fixture: ComponentFixture<DentistaConsultarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DentistaConsultarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DentistaConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
