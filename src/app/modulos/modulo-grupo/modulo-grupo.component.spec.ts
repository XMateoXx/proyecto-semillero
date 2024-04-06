import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloGrupoComponent } from './modulo-grupo.component';

describe('ModuloGrupoComponent', () => {
  let component: ModuloGrupoComponent;
  let fixture: ComponentFixture<ModuloGrupoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuloGrupoComponent]
    });
    fixture = TestBed.createComponent(ModuloGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
