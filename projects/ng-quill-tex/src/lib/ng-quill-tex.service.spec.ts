import { TestBed } from '@angular/core/testing';

import { NgQuillTexService } from './ng-quill-tex.service';

describe('NgQuillTexService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgQuillTexService = TestBed.get(NgQuillTexService);
    expect(service).toBeTruthy();
  });
});
