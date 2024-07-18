import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaInicialHomeComponent } from './pagina-inical-home.component';

describe('PaginaInicalHomeComponent', () => {
  let component: PaginaInicialHomeComponent;
  let fixture: ComponentFixture<PaginaInicialHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaInicialHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaInicialHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
