import { TestBed } from '@angular/core/testing';

import { FrancetteService } from './francette.service';

describe('FrancetteService', () => {
  let service: FrancetteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrancetteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
