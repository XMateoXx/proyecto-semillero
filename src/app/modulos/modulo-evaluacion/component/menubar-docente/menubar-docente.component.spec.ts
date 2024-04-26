import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubarDocenteComponent } from './menubar-docente.component';

describe('MenubarDocenteComponent', () => {
  let component: MenubarDocenteComponent;
  let fixture: ComponentFixture<MenubarDocenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenubarDocenteComponent]
    });
    fixture = TestBed.createComponent(MenubarDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
