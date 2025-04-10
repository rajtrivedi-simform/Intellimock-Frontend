import { TestBed } from '@angular/core/testing';

import { FetchQuestionByIdService } from './fetch-question-by-id.service';

describe('FetchQuestionByIdService', () => {
  let service: FetchQuestionByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchQuestionByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
