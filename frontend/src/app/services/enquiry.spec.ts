import { TestBed } from '@angular/core/testing';
import { EnquiryService } from './enquiry';
import { provideHttpClient } from '@angular/common/http';

describe('EnquiryService', () => {
  let service: EnquiryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EnquiryService,
        provideHttpClient()
      ]
    });

    service = TestBed.inject(EnquiryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});