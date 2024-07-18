import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistasCadastrarComponent } from './dentistas-cadastrar.component';

describe('DentistasCadastrarComponent', () => {
  let component: DentistasCadastrarComponent;
  let fixture: ComponentFixture<DentistasCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DentistasCadastrarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DentistasCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
