import { TestBed } from '@angular/core/testing';

import { ShoppinglistService } from './shoppinglist.service';

describe('ShoppinglistService', () => {
  let service: ShoppinglistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppinglistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
