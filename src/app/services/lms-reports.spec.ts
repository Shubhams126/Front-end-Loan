import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { LMSReportsService } from './lms-reports';

describe('LMSReportsService', () => {
  let service: LMSReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });

    service = TestBed.inject(LMSReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
