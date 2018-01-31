import { TestBed, inject } from '@angular/core/testing';

import { UserDetailsPageService } from './user-details-page.service';

describe('UserDetailsPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDetailsPageService]
    });
  });

  it('should be created', inject([UserDetailsPageService], (service: UserDetailsPageService) => {
    expect(service).toBeTruthy();
  }));
});
