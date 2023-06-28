import { TestBed } from '@angular/core/testing';

import { SavedListService } from './saved-list.service';

describe('SavedListService', () => {
  let service: SavedListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
