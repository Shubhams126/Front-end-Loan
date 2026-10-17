import { TestBed } from '@angular/core/testing';

import { SupportTicket } from './support-ticket';

describe('SupportTicket', () => {
  let service: SupportTicket;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportTicket);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
