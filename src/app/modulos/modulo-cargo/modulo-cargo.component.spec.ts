import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloCargoComponent } from './modulo-cargo.component';

describe('ModuloCargoComponent', () => {
  let component: ModuloCargoComponent;
  let fixture: ComponentFixture<ModuloCargoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuloCargoComponent]
    });
    fixture = TestBed.createComponent(ModuloCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
