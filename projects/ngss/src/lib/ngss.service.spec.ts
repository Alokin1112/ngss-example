import { TestBed } from '@angular/core/testing';

import { NgssService } from './ngss.service';

describe('NgssService', () => {
  let service: NgssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
