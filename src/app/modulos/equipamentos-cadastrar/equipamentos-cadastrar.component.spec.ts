import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentosCadastrarComponent } from './equipamentos-cadastrar.component';

describe('EquipamentosCadastrarComponent', () => {
  let component: EquipamentosCadastrarComponent;
  let fixture: ComponentFixture<EquipamentosCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipamentosCadastrarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipamentosCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
