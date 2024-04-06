import { TestBed } from '@angular/core/testing';

import { ModuloGrupoService } from './modulo-grupo.service';

describe('ModuloGrupoService', () => {
  let service: ModuloGrupoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuloGrupoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
