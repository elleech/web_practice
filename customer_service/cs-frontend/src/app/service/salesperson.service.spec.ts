import { TestBed } from '@angular/core/testing';

import { SalespersonService } from './salesperson.service';

describe('SalespersonService', () => {
  let service: SalespersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalespersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
